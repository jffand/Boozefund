$(document).ready(function() {
	$("#userForm").submit(function( event ) {

		var userData = {};
		userData.name = $("#newUser").val();
		userData.tab = parseInt($("#tab").val(),10);

		event.preventDefault();
		$.ajax({
			type: "POST",
			url: "/data/userAdd",
			data: userData,
			success: function() {
				$("#userMessage").html("<p class='bg-success'>User added successfully<p>");
			},
			error: function() {
				$("#userMessage").html("<p class='bg-danger'>Error adding user<p>");
			},
			dataType: JSON
		});
	});
});