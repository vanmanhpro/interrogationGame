let currentScore = 0;
let playersTotalChoiceName = 0;
let averageChoiceMade;
let playersTotalMove = 0;

function renderByOrder(id, nextStage){
	$.post("get",
	{
		id : id
	},
	function(data,status){
		console.log(data);

	    $("#question").html(data.question);

	    if( id != 3){
			// Create buttons
			for(let i = 0, n = data.choice.length; i < n; i++){
				var swatch = document.createElement('button');
				swatch.type = 'button';
				swatch.className = 'btn playerOption';
				swatch.value = i;
				var buttonText = document.createTextNode(data.choice[i].choiceName);
				swatch.appendChild(buttonText);

				document.getElementById('numberButtons').appendChild(swatch);
			}
		} else {
			// Create input form for question 4
			var form = document.createElement('div');
			form.id = "inputForm"
			form.className = "form";

			var input = document.createElement('input');
			input.className = "form-control"
			input.type = "number";
			input.id = "inputNumber"

			var submit = document.createElement('button');
			submit.className = "btn";
			submit.id = "submitNumber"
			var buttonText = document.createTextNode("Submit");
			submit.appendChild(buttonText);

			form.appendChild(input);
			form.appendChild(submit); 
			document.getElementById('numberButtons').appendChild(form);
		}

		$(document).ready(function(){
			$("#submitNumber").click(function(){
				var input = document.getElementById("inputNumber");
				console.log(input.value);
				$.post("serverData",
				function(data,status){
					// A perparation for question 6
					averageChoiceMade = data.averageChoiceMade;
					console.log("averageChoiceMade " + averageChoiceMade);

					console.log("total Player " + data.totalPlayer);
					console.log("total Win " + data.totalWin);

					// How much point should he get
					let diff = Math.abs( input.value - (data.totalWin) );
					let bonus = Math.floor( (1 - (diff/ (data.totalPlayer + 1))) * 10);
					console.log("bonus " + bonus);
					currentScore += bonus;

					$("#score").html(currentScore);

			    	nextStage();
				});
			})
		    $(".playerOption").click(function(){
		    	//console.log(data.choice[this.value].choiceName);
		    	choicePicked = this.value;
		    	playersTotalChoiceName += data.choice[choicePicked].choiceName;
		    	playersTotalMove += 1;

		    	// Should the player earn that score?
		    	currentScore += calculateBonus( id, choicePicked, data);
		    	

		    	$("#score").html(currentScore);

		    	// if (currentScore >= 30) {
		    	// 	alert("You win, sonuvabitch");
		    	// }

		    	// Update the question's data
		    	data.choice[choicePicked].choiceCount++;
		    	$.post("update",
		    	{
		    		question : data
		    	},
		    	function(data){
		    		console.log(data);
		    	})
		    	


		       	nextStage();
		    });
		});
	});
}

function renderEndStage(){
	$(".prisoner-container").remove();
	let finalWords;
	console.log("playersTotalChoiceName " + playersTotalChoiceName );
	console.log("playersTotalMove " + playersTotalMove );
	if ( currentScore >= 30){
		finalWords = "You've won. Now get the hell outa here!";
		$.post("finalUpdate",
		{
			state : "win",
			playersTotalChoiceName : playersTotalChoiceName,
			playersTotalMove : playersTotalMove
		})
	} else {
		finalWords = "You've lost. You are going to die!";
		$.post("finalUpdate",
		{
			state : "lost",
			playersTotalChoiceName : playersTotalChoiceName,
			playersTotalMove : playersTotalMove
		})
	}
	$("#question").html(finalWords);
}


function gameStage(id){
	renderByOrder(id, () => {
		if (id < 5) {
			$(".playerOption").remove();
			$("#inputForm").remove();
			gameStage(id + 1);
		} else {
			renderEndStage();
		}
	});	
}

gameStage(0);

function calculateBonus( id, choicePicked, data){
	var threshold;	
	if (id == 0){
		threshold = 17 / 100;
	} else if (id == 1){
		threshold = 20 / 100;
	} else if (id == 2){
		threshold = 13 / 100;
	} else if (id == 4){
		threshold = 10 / 100;
	}

	let sum = 0;
	for( let i = 0, n = data.choice.length; i < n; i++){
		sum += data.choice[i].choiceCount;
	}

	if ( (sum === 0) || ( (data.choice[choicePicked].choiceCount / sum) <= (threshold) ) ){
		console.log("He earns it")
		return data.choice[choicePicked].choiceName;
	} else {
		console.log("He does not earn it");
		return 0;
	}

	if (id == 5){
		if (data.choice[choicePicked].choiceName <= averageChoiceMade) {
			console.log("He earns it");
			return data.choice[choicePicked].choiceName;
		} else {
			console.log("He does not earn it");
			return 0;
		}
	}
}

// $.post("get",
// {
// 	id : 0
// },
// function(data,status){
// 	$("#question").html(data.question);
// 	var buttons = [];

// 	for( let i = 0; i < data.choice.length; i++){
// 		buttons.push(data.choice[i].choiceName);
// 	}

// 	for(let i = 0, n = buttons.length; i < n; i++){
// 		var swatch = document.createElement('button');
// 		swatch.type = 'button';
// 		swatch.className = 'btn';
// 		var buttonText = document.createTextNode(buttons[i]);
// 		swatch.appendChild(buttonText);

// 		// swatch.addEventListener('click', sendAnswer);
// 		document.getElementById('numberButtons').appendChild(swatch);
// 	}
// 	// function sendAnswer(e){
// 	// 	var swatch = e.target;
// 	// 	console.log(swatch);
// 	// }	
// 	$(document).ready(function(){
// 	    $("button").click(function(){
// 	    	console.log("clicked")
// 	        // $.post("get",
// 	        // {
// 	        // 	id : 0
// 	        // },
// 	        // function(data,status){
// 	        //     alert("Data: " + data.question + "\nStatus: " + status);
// 	        // });
// 	    });
// 	});
// })


// // $(document).ready(function(){
// //     $("button").click(function(){
// //         $.post("get",
// //         {
// //         	id : 0
// //         },
// //         function(data,status){
// //             alert("Data: " + data.question + "\nStatus: " + status);
// //         });
// //     });
// // });

