$(document).ready(function() {
	$("#userForm").submit(function( event ) {

		var userData = {};
		userData.username = $("#user").val();
		userData.tab = parseInt($("#tab").val(),10);

		event.preventDefault();
		var action = $("input[name='userRadio']:checked","#userForm").val();

		if(action === 'userAdd') {
			$.ajax({
				type: "POST",
				url: "/data/userAdd",
				data: userData,
				dataType: 'json',
				success: function() {
					$("#userMessage").html("<p class='bg-success'>User added successfully<p>");
				},
				error: function() {
					console.log(status);
					$("#userMessage").html("<p class='bg-danger'>Error adding user<p>");
				},
			});
		} else if(action === 'userUpdate') {
				$.ajax({
				type: "POST",
				url: "/data/userUpdate",
				data: userData,
				dataType: 'json',
				success: function() {
					$("#userMessage").html("<p class='bg-success'>User updated successfully<p>");
				},
				error: function(){
					$("#userMessage").html("<p class='bg-danger'>Error updating user<p>");
				}
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
				dataType: 'json'
			});
		}
	});

	$("#groupsForm").submit(function( event ) {

		var groupData = {};
		groupData.name = $("#GroupName").val();
		groupData.description = $("#description").val();

		event.preventDefault();
		var action = $("input[name='groupRadio']:checked","#groupsForm").val();

		if(action === 'groupAdd') {
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
				dataType: 'json'
			});
		} else if(action === 'groupUpdate') {
					$.ajax({
				type: "POST",
				url: "/data/groupUpdate",
				data: groupData,
				success: function() {
					$("#groupMessage").html("<p class='bg-success'>Group updated successfully<p>");
				},
				error: function() {
					$("#groupMessage").html("<p class='bg-danger'>Error updating group<p>");
				},
				dataType: 'json'
			});
		} else if(action === 'groupDelete') {
					$.ajax({
				type: "POST",
				url: "/data/groupDelete",
				data: groupData,
				success: function() {
					$("#groupMessage").html("<p class='bg-success'>Group deleted successfully<p>");
				},
				error: function() {
					$("#groupMessage").html("<p class='bg-danger'>Error deleting group<p>");
				},
				dataType: 'json'
			});
		}

	});

	$("#membersForm").submit(function( event ) {

		var memberData = {};
		memberData.user = $("#userMember").val();
		memberData.group = $("#groupJoin").val();

		event.preventDefault();
		var action = $("input[name='memberRadio']:checked","#membersForm").val();

		if(action === 'memberAdd') {
			$.ajax({
				type: "POST",
				url: "/data/memberAdd",
				data: memberData,
				success: function() {
					$("#memberMessage").html("<p class='bg-success'>membership added successfully<p>");
				},
				error: function() {
					$("#memberMessage").html("<p class='bg-danger'>Error adding membership<p>");
				},
				dataType: 'json'
			}); }else if(action === 'memberDelete') {
					$.ajax({
				type: "POST",
				url: "/data/memberDelete",
				data: memberData,
				success: function() {
					$("#memberMessage").html("<p class='bg-success'>Membership deleted successfully<p>");
				},
				error: function() {
					$("#memberMessage").html("<p class='bg-danger'>Error removing membership<p>");
				},
				dataType: 'json'
				});
			}
	});

	$("#boozeForm").submit(function( event ) {

		var boozeData = {};
		boozeData.name = $("#theBooze").val();
		boozeData.size = parseInt($("#size option:selected").text(),10);
		boozeData.price = parseInt($("#price").val(),10);
		boozeData.type = $("#type option:selected").text();

		console.log(boozeData);

		event.preventDefault();
		var action = $("input[name='boozeRadio']:checked","#boozeForm").val();

		if(action === 'boozeAdd') {
			$.ajax({
				type: "POST",
				url: "/data/boozeAdd",
				data: boozeData,
				success: function() {
					$("#boozeMessage").html("<p class='bg-success'>Booze added successfully<p>");
				},
				error: function() {
					$("#boozeMessage").html("<p class='bg-danger'>Error adding booze<p>");
				},
				dataType: 'json'
			});
		} else if(action === 'boozeUpdate') {
					$.ajax({
				type: "POST",
				url: "/data/boozeUpdate",
				data: boozeData,
				success: function() {
					$("#boozeMessage").html("<p class='bg-success'>Booze updated successfully<p>");
				},
				error: function() {
					$("#boozeMessage").html("<p class='bg-danger'>Error updating booze<p>");
				},
				dataType: 'json'
			});
		} else if(action === 'boozeDelete') {
					$.ajax({
				type: "POST",
				url: "/data/boozeDelete",
				data: boozeData,
				success: function() {
					$("#boozeMessage").html("<p class='bg-success'>booze deleted successfully<p>");
				},
				error: function() {
					$("#boozeMessage").html("<p class='bg-danger'>Error deleting booze<p>");
				},
				dataType: 'json'
			});
		}

	});

	$("#wantsForm").submit(function( event ) {

		var wantData = {};
		wantData.group = $("#groupWant").val();
		wantData.booze = $("#boozeWant").val();
		wantData.upvote = parseInt($("#upvoteWant").val(),10);

		event.preventDefault();
		var action = $("input[name='wantRadio']:checked","#wantsForm").val();

		if(action === 'wantAdd') {
			$.ajax({
				type: "POST",
				url: "/data/wantAdd",
				data: wantData,
				success: function() {
					$("#wantMessage").html("<p class='bg-success'>want added successfully<p>");
				},
				error: function() {
					$("#wantMessage").html("<p class='bg-danger'>Error adding want<p>");
				},
				dataType: 'json'
			}); } else if(action === 'wantUpdate') {
					$.ajax({
				type: "POST",
				url: "/data/wantUpdate",
				data: wantData,
				success: function() {
					$("#wantMessage").html("<p class='bg-success'>want updated successfully<p>");
				},
				error: function() {
					$("#wantMessage").html("<p class='bg-danger'>Error updating want<p>");
				},
				dataType: 'json'
			}); } else if(action === 'wantDelete') {
					$.ajax({
				type: "POST",
				url: "/data/wantDelete",
				data: wantData,
				success: function() {
					$("#wantMessage").html("<p class='bg-success'>want deleted successfully<p>");
				},
				error: function() {
					$("#wantMessage").html("<p class='bg-danger'>Error removing want<p>");
				},
				dataType: 'json'
				});
			}
	});

	$("#votesForm").submit(function( event ) {

		var voteData = {};
		voteData.user = $("#userVote").val();
		voteData.group = $("#groupVote").val();
		voteData.booze = $("#boozeVote").val();

		event.preventDefault();
		var action = $("input[name='voteRadio']:checked","#votesForm").val();

		if(action === 'voteAdd') {
			$.ajax({
				type: "POST",
				url: "/data/voteAdd",
				data: voteData,
				success: function() {
					$("#voteMessage").html("<p class='bg-success'>vote added successfully<p>");
				},
				error: function() {
					$("#voteMessage").html("<p class='bg-danger'>Error adding vote<p>");
				},
				dataType: 'json'
			}); }else if(action === 'voteDelete') {
					$.ajax({
				type: "POST",
				url: "/data/voteDelete",
				data: voteData,
				success: function() {
					$("#voteMessage").html("<p class='bg-success'>vote deleted successfully<p>");
				},
				error: function() {
					$("#voteMessage").html("<p class='bg-danger'>Error removing vote<p>");
				},
				dataType: 'json'
				});
			}
	});

	$("#purchasesForm").submit(function( event ) {

		var purchaseData = {};
		purchaseData.group = $("#groupPurchase").val();
		purchaseData.booze = $("#boozePurchase").val();

		event.preventDefault();
		var action = $("input[name='purchaseRadio']:checked","#purchasesForm").val();

		if(action === 'purchaseAdd') {
			$.ajax({
				type: "POST",
				url: "/data/purchaseAdd",
				data: purchaseData,
				success: function() {
					$("#purchaseMessage").html("<p class='bg-success'>purchase added successfully<p>");
				},
				error: function() {
					$("#purchaseMessage").html("<p class='bg-danger'>Error adding purchase<p>");
				},
				dataType: 'json'
			}); }else if(action === 'purchaseDelete') {
					$.ajax({
				type: "POST",
				url: "/data/purchaseDelete",
				data: purchaseData,
				success: function() {
					$("#purchaseMessage").html("<p class='bg-success'>Purchase deleted successfully<p>");
				},
				error: function() {
					$("#purchaseMessage").html("<p class='bg-danger'>Error removing purchase<p>");
				},
				dataType: 'json'
				});
			}
	});
});