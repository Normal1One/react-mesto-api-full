const Card = require('../models/card');
const NotFoundErr = require('../errors/not-found-err');
const ForbiddenErr = require('../errors/forbidden-err');

function formatCardResponse(card) {
  return {
    name: card.name,
    link: card.link,
    owner: card.owner,
    likes: card.likes,
    createdAt: card.createdAt,
    _id: card._id,
  };
}

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      Card.findById(card._id)
        .populate('owner')
        .then((result) => {
          res.send(formatCardResponse(result));
        });
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundErr('Запрашиваемая карточка не найдена');
      }
      if (card.owner._id.toHexString() === req.user._id) {
        Card.findByIdAndRemove(req.params.cardId)
          .then(() => res.send(formatCardResponse(card)));
      } else {
        throw new ForbiddenErr('Запрещено удалять чужие карточки');
      }
    })
    .catch(next);
};

function changeLikeCard(req, res, next, options) {
  Card.findByIdAndUpdate(req.params.cardId, options, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw new NotFoundErr('Запрашиваемая карточка не найдена');
      } else {
        res.send(formatCardResponse(card));
      }
    })
    .catch(next);
}

module.exports.likeCard = (req, res, next) => {
  changeLikeCard(req, res, next, { $addToSet: { likes: req.user._id } });
};

module.exports.dislikeCard = (req, res, next) => {
  changeLikeCard(req, res, next, { $pull: { likes: req.user._id } });
};
