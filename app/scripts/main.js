(function($){ 

	var size = 200,
		width = 8,
		board,
		grid = {},
		solution = [];
		searchOrder = [4,5,3,6,2,7,1,8]; //order in which to check rows.
		// searchOrder = [1,2,3,4,5,6,7,8]; //order in which to check rows.

	function Queens(){
		this.setup();
		this.startSearch();
	}

	Queens.prototype.setup = function(){
		$('body').append('<div id="chessboard"></div>');
		board = $('#chessboard');
		for(var x=1; x<=8; x++){
			grid[x] = {}
			for(y=1; y<=8; y++){
				grid[x][y] = false; //start with false, and save the value of the Row where the Queen is at that blocks it later.
				var even = ((x-y) % 2 == 0) ? 'even' : '';
				$(board).append('<div class="x' + x + ' y' + y +' checker ' + even + '"></div>');
			}
		}
	}

	Queens.prototype.startSearch = function(){

		var  iterations = 0,
			_this = this;

		(function iterate(){

			var rowIndex 	=  searchOrder[ solution.length ];

			var availableSqs =  _this.availableByRow( grid[rowIndex] ); 

			$('.queen', '.X' + rowIndex ).removeClass('queen');

			if( availableSqs ){
				var random = _this.pickRandom(availableSqs);
				solution.push( random );
				_this.addQueen( rowIndex, random );
			} else {
				
				// WHY DOES THIS ERROR IN A FOR LOOP?!
				for(i=solution.length; i--; i<=1){
					if( _this.availableByRow(searchOrder[solution.length-1]) == false ){
						solution.splice(-1,1); 
					} else {
						break;
					}
				}
				
				_this.recalculate( rowIndex );

			}
			
			iterations++;

			if( iterations > 500 || solution.length == 8 ){
				$('body').append('finished in ' + iterations + ' iterations');
				return false;
			} else {
				iterate();
			}

		})();

	}

	Queens.prototype.pickRandom = function(arr){
	 	return arr[ Math.floor(Math.random()*arr.length)];
	}

	Queens.prototype.availableByRow = function(row){
		var available = [];
		for( col in row ){
			if( row[col] == false ){
				available.push(col);
			}
		}
		return ( available.length > 0 ) ? available : false;
	}

	Queens.prototype.addQueen = function( row, col){

		$('.x' + row + '.y' + col ).addClass('queen');	

		for( X in grid ){
			for( Y in grid[X] ){

				var horizontal 	= (X == row);
				var vertical 	= (Y == col);
				var diagonal 	= (X - row == Y - col) || (X - row == -(Y - col) );
			
				if( horizontal || vertical || diagonal ){
					grid[X][Y] = true;
					$('.x' + X + '.y' + Y ).addClass('disabled');	
				}

			}
		}
	}

	Queens.prototype.recalculate = function( row ){

		//set all squares to false (not blocked by queen)
		for( X in grid ){
			for( Y in grid[X] ){
				grid[X][Y] = false;
				$('.x' + X + '.y' + Y ).removeClass('queen');	
			}
		}
		var i = 0;
		for( answer in solution ){
			this.addQueen( searchOrder[i], solution[answer] );
			i++;
		}

	}

	new Queens();

})(jQuery);