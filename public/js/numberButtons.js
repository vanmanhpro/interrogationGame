let currentScore = 0;

function renderByOrder(id, callback){
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

				//swatch.addEventListener('click', sendAnswer);
				document.getElementById('numberButtons').appendChild(swatch);
			}
		} else {
			var swatch = document.createElement('input');
			swatch.type = 'number';
			document.getElementById('numberButtons').appendChild(swatch);
		}

		$(document).ready(function(){
		    $(".playerOption").click(function(){
		    	console.log(data.choice[this.value].choiceName);

		    	// Should the player earn that score?
		    	choicePicked = this.value;
		    	let sum = 0;
		    	for( let i = 0, n = data.choice.length; i < n; i++){
		    		sum += data.choice[i].choiceCount;
		    	}


		    	if ( (sum === 0) || ( (data.choice[choicePicked].choiceCount / sum) <= (17 / 100) ) ){
		    		console.log("He earns it")
		    		currentScore += data.choice[choicePicked].choiceName;
		    	}

		    	$("#score").html(currentScore);

		    	if (currentScore >= 30) {
		    		alert("You win, sonuvabitch");
		    	}

		    	// Update the question's data
		    	data.choice[choicePicked].choiceCount++;
		    	$.post("update",
		    	{
		    		question : data
		    	},
		    	function(data){
		    		console.log(data);
		    	})
		    	


		       	callback();
		    });
		});
	});
}

function gameStage(id){
	renderByOrder(id, () => {
		if (id < 5) {
			$(".playerOption").remove();
			gameStage(id + 1);
		}
	});	
}

gameStage(0);

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

