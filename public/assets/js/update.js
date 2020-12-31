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


// window.addEventListener("load", function(){
// 	var draggable = document.getElementById("dragthis"),
// 		droppable = document.getElementById("dropthis");

// 	// DRAG START - YELLOW HIGHLIGHT DROPZONE
// 	draggable.addEventListener("dragstart", function () {
// 	  droppable.classList.add("hint");
// 	});

// 	// DRAG ENTER - RED HIGHLIGHT DROPZONE
// 	droppable.addEventListener("dragenter", function () {
// 	  droppable.classList.add("active");
// 	});

// 	// DRAG LEAVE - REMOVE RED HIGHLIGHT
// 	droppable.addEventListener("dragleave", function () {
// 	  droppable.classList.remove("active");
// 	});

// 	// DRAG OVER - PREVENT THE DEFAULT "DROP", SO WE CAN DO OUR OWN
// 	droppable.addEventListener("dragover", function (evt) {
// 	  evt.preventDefault();
// 	});

// 	// ON DROP - DO SOMETHING
// 	droppable.addEventListener("drop", function (evt) {
// 	  evt.preventDefault();
// 	  alert("DROPPED!");
// 	});

// 	// DRAG END - REMOVE ALL HIGHLIGHT
// 	draggable.addEventListener("dragend", function () {
// 	  droppable.classList.remove("hint");
// 	  droppable.classList.remove("active");
// 	});

// 	// NOT USED - WHEN DRAGGABLE IS BEING DRAGGED AROUND
// 	// draggable.addEventListener("drag", function (evt) {  });
//   });

// window.addEventListener("load", function(){
// 	var items = document.querySelectorAll("#sortlist li"),
// 		dragged = null;

// 	for (let i of items) {
// 	  // DRAG START - YELLOW HIGHLIGHT DROPZONE
// 	  // Highlight all except the one being dragged
// 	  i.addEventListener("dragstart", function () {
// 		dragged = this;
// 		for (let it of items) {
// 		  if (it != dragged) { it.classList.add("hint"); }
// 		}
// 	  });

// 	  // DRAG ENTER - RED HIGHLIGHT DROPZONE
// 	  i.addEventListener("dragenter", function () {
// 		if (this != dragged) { this.classList.add("active"); }
// 	  });

// 	  // DRAG LEAVE - REMOVE RED HIGHLIGHT
// 	  i.addEventListener("dragleave", function () {
// 		this.classList.remove("active");
// 	  });

// 	  // DRAG OVER - PREVENT THE DEFAULT "DROP", SO WE CAN DO OUR OWN
// 	  i.addEventListener("dragover", function (evt) {
// 		evt.preventDefault();
// 	  });

// 	  // ON DROP - DO SOMETHING
// 	  i.addEventListener("drop", function (evt) {
// 		evt.preventDefault();
// 		if (this != dragged) {
// 		  let all = document.querySelectorAll("#sortlist li"),
// 			  draggedpos = 0, droppedpos = 0;
// 		  for (let it=0; it<all.length; it++) {
// 			if (dragged == all[it]) { draggedpos = it; }
// 			if (this == all[it]) { droppedpos = it; }
// 		  }
// 		  if (draggedpos < droppedpos) {
// 			this.parentNode.insertBefore(dragged, this.nextSibling);
// 		  } else {
// 			this.parentNode.insertBefore(dragged, this);
// 		  }
// 		}
// 	  });

// 	  // DRAG END - REMOVE ALL HIGHLIGHT
// 	  i.addEventListener("dragend", function () {
// 		for (let it of items) {
// 		  it.classList.remove("hint");
// 		  it.classList.remove("active");
// 		}
// 	  });
// 	}
//   });