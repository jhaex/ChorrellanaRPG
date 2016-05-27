// Declaration of Enemy data.
function Enemy(game){
	this.game = game;
	this.health = 100;
	this.sprite = null;
	this.colliderSprite = null;
	this.speed = Math.floor(Math.random() * 150);
	this.animation = 'redEnemy';
	this.direction = 'Down';
	this.stopped = true;
	this.initial = Math.floor(Math.random() * (1356));
	this.enableBody = true;
	this.positionData = {
	colliderDifference: {x: 4, y: 3}, // distance from collider sprite to sprite
};

}

// Initializes the Enemys sprites.
Enemy.prototype.render = function(){
	// loads sprites
	this.colliderSprite = this.game.add.sprite(this.initial - this.positionData.colliderDifference.x, this.initial - this.positionData.colliderDifference.y, 'enemyCollider');
	this.sprite = this.game.add.sprite(this.initial, this.initial, 'enemy');
	this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

	// sets sprite properties
	this.colliderSprite.alpha = 0; // invisible collider sprite
	this.game.physics.arcade.enable(this.colliderSprite); // enables physics on colliderSprite
	this.game.physics.arcade.enable(this.sprite); // enables physics on sprite

	//this.colliderSprite.immovable = true; // makes it immovable when a collision occurs
	this.colliderSprite.body.collideWorldBounds = true; // colliderSprite cannot exceed the world bounds
	//this.collider.body.collider

};

// Defines the Enemy's animations with their respective frames.
Enemy.prototype.addAnimations = function () {
	this.sprite.animations.add(this.animation + 'Left', [3, 4, 5], 8, true);
	this.sprite.animations.add(this.animation + 'Right', [6, 7, 8], 8, true);
	this.sprite.animations.add(this.animation + 'Up', [9, 10, 11], 8, true);
	this.sprite.animations.add(this.animation + 'Down', [0, 1, 2], 8, true);
}

// Loads the Enemy's sprites and defines it's animations.
Enemy.prototype.load = function(){
	this.render();
	this.addAnimations();
}

// Plays the current animation.
Enemy.prototype.playAnimation = function(){
	this.sprite.play(this.animation + this.direction);
}


// Stops the Enemy's movement.
Enemy.prototype.stop = function(){
	this.stopped = true;
	this.colliderSprite.body.velocity.x = 0;
	this.colliderSprite.body.velocity.y = 0;
}

// Moves the Enemy's colliderSprite with a given speed and direction.
Enemy.prototype.move = function(speed, direction){
	this.stopped = false;
	switch (direction) {
		//Vertical=0; Horizontal=1
		case 0:
			this.colliderSprite.body.velocity.y = speed;
			break;
		case 1:
			this.colliderSprite.body.velocity.x = speed;
			break;
	}
}

// Moves the Enemy's sprite.
Enemy.prototype.setBodyPosition = function(x, y){
	this.sprite.x = x;
	this.sprite.y = y;
}

// Checks the input and handles the movement.
Enemy.prototype.handleMovement = function(){
	
	this.lookingForPlayer();

	this.playAnimation();

	this.setBodyPosition(this.colliderSprite.x - this.positionData.colliderDifference.x, this.colliderSprite.y - this.positionData.colliderDifference.x);



	this.game.physics.arcade.overlap(this.sprite, this.game.player.sprite, null, this._enemyAttack, this);
	
	
}
	//busca al jugador
Enemy.prototype.lookingForPlayer = function(){

	if (this.game.player.sprite.y > this.sprite.y){
		this.direction = "Down";
		this.move(this.speed, 0);
	}

	else if (this.game.player.sprite.y < this.sprite.y){
		this.direction = "Up";
		this.move(-this.speed, 0);
	}


	if(this.game.player.sprite.x > this.sprite.x){
		this.direction = "Right";
		this.move(this.speed, 1);
	}

	else if (this.game.player.sprite.x < this.sprite.x){
		this.direction = "Left";
		this.move(-this.speed,1);
	}
}

// Updates the Enemy.
Enemy.prototype.update = function(){
	this.handleMovement();
	
	
}

//Enemy Attack
var contador = 0;
Enemy.prototype._enemyAttack = function() {
    
	contador += 1;

	if(contador == 10) {

    this.game.player.health -= 5;
    contador = 0;


	}
}


