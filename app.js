var state = { items: [] };

var addItem = function(state, item) {
	state.items.push(item); // add a new item to the box
}

var showResults = function(state, element) {
	var itemsHtml = state.items.map(function(item) {
		return ('<li><span class="shopping-item">' + item + '</span>' +
		'<div class="shopping-item-controls">' +
          '<button class="shopping-item-toggle">' +
            '<span class="button-label">check</span>' +
          '</button>' +
          '<button class="shopping-item-delete">' +
            '<span class="button-label">delete</span>' +
          '</button>' +
        '</div>' +
      '</li>'); //create a new container with the item already contained
	});
	element.html(itemsHtml);
};
var init = function(state) {
	$('.shopping-item').each(function() {
		addItem(state, $(this).text());
	})
	showResults(state, $('.shopping-list'));
	bindCheckedEvent();
	bindDeleteEvent();
}

var bindCheckedEvent = function() {
	//get the shopping item toggle button and bind click event
	$('.shopping-list').on("click", '.shopping-item-toggle', function(event) {
		// ...that toggles shopping item class
		$(this).closest("li").find('.shopping-item')
			.toggleClass("shopping-item__checked");
	})
}

 var bindDeleteEvent = function() {
	$('.shopping-list').on("click",'.shopping-item-delete', function(event) {
		var parent_li = $(this).closest("li")
			.find('.shopping-item').text();
		state.items.splice(state.items.indexOf(parent_li),1);
		showResults(state, $('.shopping-list'));
		console.log(state.items);
		console.log(parent_li)
		// delete from state.item then rerender your list
	});

} 

$(document).ready(function() {
	init(state);
	$('#js-shopping-list-form').submit(function(event) { // when add item is clicked 
	event.preventDefault();
	addItem(state,$('#shopping-list-entry').val());
	showResults(state, $('.shopping-list'));
	$('#shopping-list-entry').val('');
	});
		

});