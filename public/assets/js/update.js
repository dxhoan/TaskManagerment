var dragItem = null;
var dragItemHeight = 0;
var newListCard = null;
var currentListCard = null;
var flagDrag = 0;

function handleDragDropCard(card) {
	card.addEventListener('dragstart', function () {
		dragItem = card;
		dragItemHeight = dragItem.getBoundingClientRect().height;
		currentListCard = card.parentElement;
		setTimeout(() => {
			card.classList.add('hide');
		}, 0);
	});

	card.addEventListener('dragenter', function (e) {
		e.preventDefault();
	});

	card.addEventListener('dragover', function (e) {
		e.preventDefault();
		if (e.target.closest(".list-card") != currentListCard) {
			if (newListCard == null || newListCard != e.target.closest(".list-card")) {
				newListCard = e.target.closest(".list-card");
			}
			if (flagDrag == 0) {
				var newEmptyCard = document.createElement('div');
				newEmptyCard.className = "empty-card";
				newEmptyCard.style.height = dragItemHeight + "px";
				newListCard.appendChild(newEmptyCard);
				flagDrag = 1;
			}
		}
	});
	card.addEventListener('drop', function (e) {
		e.preventDefault();
		if (e.target.closest(".list-card") != dragItem.parentElement) {
			newListCard.removeChild(newListCard.lastElementChild);
			newListCard.append(dragItem);
			let url = "/boards/" + dragItem.getAttribute('data-id-board') + "/lists/" + dragItem.getAttribute('data-id-list') + "/cards/" + dragItem.getAttribute('data-id-card');
			let data = setTokenToData("lists_id", newListCard.parentElement.getAttribute('data-id-list'));
			dragItem.setAttribute('data-id-list', newListCard.parentElement.getAttribute('data-id-list'));
			handleAPI(url, data, "PUT", "card");
			dragItem = null;
			newListCard = null;
			dragItemHeight = 0;
			flagDrag = 0;
		}
	});

	card.addEventListener("dragleave", function (e) {
		if (e.target.closest('.list-card') != currentListCard) {
			if (card.parentElement.lastElementChild.classList.contains("empty-card")) {
				card.parentElement.removeChild(card.parentElement.lastElementChild);
				flagDrag = 0;
			}
		}
	})

	card.addEventListener("dragend", function () {
		card.classList.remove('hide');
		dragItemHeight = 0;
		dragItem = null;
		flagDrag = 0;
		newListCard = null;
	});
}
