$(document).ready(function() {
	$("#login").submit(function( event ) {
		event.preventDefault();

		userData ={};
		userData.username = $("#username").val();
		userData.pass = $("#pass").val();

		$.ajax({
				type: "POST",
				url: "/login",
				data: userData,
				dataType: 'json',
				success: function() {
					window.location.replace('/dataView');
				},
				error: function() {
					console.log(status);
					$("#errorbox").html("<p class='alert alert-danger'>Username or Password incorrect<p>");
				}
			});
	});
});
