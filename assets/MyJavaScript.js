function myFunction(){
	var val = document.getElementsByName("optradio");
	var totalCost = 0;
	for(var i=0; i<val.length;i++){
		if(val[i].checked)
			totalCost += parseInt(val[i].value);
	}
	var answer= " <span style='font-size:300%' > $"+totalCost+"</span>";
	$("#total").html(answer);
	document.getElementById("qwerty").style.display = "block";
}	

function showAddressBox(){

	document.getElementById("asdf").style.display = "block";
	document.getElementById("abcd").style.display = "none";
}
function showAddress(){

	document.getElementById("abcd").style.display = "block";
	document.getElementById("asdf").style.display = "none";
}
function send_email(){

	var from,to,text;
	to=$("#to").val();
	text=$("#content").val();
	$("#message").text("Sending Email..Please wait");
	$.get("http://127.0.0.1:8081/",{to:to,text:text},function(data){
		if(data=="sent"){
			$("$message").empty().html("Email has been sent to "+to+". Please check your inbox!");
		}

	});
}