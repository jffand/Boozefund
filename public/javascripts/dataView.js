$(document).ready(function() {
	$("#userForm").submit(function( event ) {

		var userData = {};
		userData.username = $("#user").val();
		userData.tab = parseInt($("#tab").val(),10);

		event.preventDefault();
		var action = $("input[name='userRadio']:checked","#userForm").val();
		console.log(action);

		if(action === 'userAdd') {
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
		} else if(action === 'userUpdate') {
					$.ajax({
				type: "POST",
				url: "/data/userUpdate",
				data: userData,
				success: function() {
					$("#userMessage").html("<p class='bg-success'>User updated successfully<p>");
				},
				error: function() {
					$("#userMessage").html("<p class='bg-danger'>Error updating user<p>");
				},
				dataType: JSON
			});
		} else if(action === 'userDelete') {
					$.ajax({
				type: "POST",
				url: "/data/userDelete",
				data: userData,
				success: function() {
					$("#userMessage").html("<p class='bg-success'>User deleted successfully<p>");
				},
				error: function() {
					$("#userMessage").html("<p class='bg-danger'>Error deleting user<p>");
				},
				dataType: JSON
			});
		}
	});

	$("#groupsForm").submit(function( event ) {

		var groupData = {};
		groupData.name = $("#newGroupName").val();
		groupData.description = $("#description").val();

		event.preventDefault();
		$.ajax({
			type: "POST",
			url: "/data/groupAdd",
			data: groupData,
			success: function() {
				$("#groupMessage").html("<p class='bg-success'>Group added successfully<p>");
			},
			error: function() {
				$("#groupMessage").html("<p class='bg-danger'>Error adding group<p>");
			},
			dataType: JSON
		});
	});

	$("#membersForm").submit(function( event ) {

		var memberData = {};
		memberData.user = $("#userMember").val();
		memberData.group = $("#groupJoin").val();

		event.preventDefault();
		$.ajax({
			type: "POST",
			url: "/data/memberAdd",
			data: memberData,
			success: function() {
				$("#memberMessage").html("<p class='bg-success'>Group added successfully<p>");
			},
			error: function() {
				$("#memberMessage").html("<p class='bg-danger'>Error adding group ***use existing users and groups***<p>");
			},
			dataType: JSON
		});
	});
});