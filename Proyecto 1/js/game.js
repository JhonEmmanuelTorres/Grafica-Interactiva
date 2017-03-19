function Game()
{
  // private fields
  var secretNumber, attempts;
  
  // methods
  this.setSecretNumber = function( digits ) 
  {
    var from = Math.pow( 10, digits ) - 1;
    var to = Math.pow( 10, digits - 1 );
    secretNumber = Math.floor( (Math.random() * from) + to);
    secretNumber = secretNumber.toString(); 
    attempts = secretNumber.length * 4;
  };
    
  this.getSecreNumber = function()
  {
    return secretNumber;
  };
  
  this.getAttempts = function()
  {
    return attempts;
  };
  
  this.decrementAttempts = function()
  {
    attempts--; 
  };

  
  // constructor
  document.getElementById("messageUp").innerHTML = "<h3>Seleccione la longitud del numero:</h1>";
  
  var initializeForm = '<form class="form-inline"><div class="form-group">';
  initializeForm += '<select class="form-control" id="nth-number">';
  for( var i = 1; i < 11; i++ )
    initializeForm += '<option>'+ i +'</option>';
  initializeForm += '</select>';
  initializeForm += '<button class="btn btn-default" type="submit" id="go" onclick="codePuzzle.beginGame()">Aceptar!</button>';
  initializeForm += '</div></form>';
  document.getElementById("submitGame").innerHTML = initializeForm;
  
}

Game.prototype.beginGame = function()
{
  var mydigits = document.getElementById( "nth-number" ).value;
  this.setSecretNumber( parseInt( mydigits ) );
  

  document.getElementById("messageUp").innerHTML = "<h3>You have " + this.getAttempts() + "  attempts</h1>";
  
  
  var initializeForm = '<form class="form-inline"><div class="form-group">';
  initializeForm += '<input type="text" class="form-control" id="possibleNumber">';
  initializeForm += '<button class="btn btn-default" type="button" id="sumitGame" onclick="codePuzzle.validateAttempt()">Verificar</button>';
  initializeForm += '</div></form>';
  document.getElementById("submitGame").innerHTML = initializeForm; 
};

Game.prototype.validateAttempt = function()
{
  var numberIn = document.getElementById( "possibleNumber" ).value;
  numberIn = numberIn.toString();
  
  this.decrementAttempts();
  if( this.getAttempts() === 0 ) // without attempst
  {
    alert( "Your Lost :( I'm so sorry" );
    location.reload();
  }
  document.getElementById("messageUp").innerHTML = "<h3>You have " + this.getAttempts() + "  attempt"+ (this.getAttempts() === 1 ? "" : "s" ) +"</h1>";
  
  var stringWithFont = '';
  for( var i = 0; i < this.getSecreNumber().length; i++ )
  {
    if( this.getSecreNumber()[i] == numberIn[i] )
      stringWithFont += '<i class="fa fa-check" aria-hidden="true"></i>';
    else if( this.getSecreNumber()[i] > numberIn[i] )
      stringWithFont += '<i class="fa fa-arrow-up" aria-hidden="true"></i>';
    else
      stringWithFont += '<i class="fa fa-arrow-down" aria-hidden="true"></i>';
  }
  var answer = "<p>Your number:\t" + numberIn + "</p>";
  var posNum = "<p>Guess:\t " +  stringWithFont + "</p>";
  document.getElementById( "tableAttempts" ).innerHTML = answer + posNum;
  
  if( numberIn === this.getSecreNumber() )
  {
    alert( "Felicitaciones!!! Tu ganaste" );
    location.reload();
  }
  
};

var codePuzzle = new Game();

