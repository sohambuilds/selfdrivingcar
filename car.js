class Car{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y
        this.width = width;
        this.height = height;
        this.speed = 0;
        this.acceleration = 0.01;
        this.MaxSpeed=3;
        this.friction = 0.005;
        this.angle=0

        this.controls = new Controls()

    }

    update(){

        this.#move()
    

    }

    #move(){
        if(this.controls.forward){
            this.speed += this.acceleration
        }
        if(this.controls.reverse){
            this.speed -= this.acceleration
        }
        if(this.speed!=0)
        {const flip = this.speed>0?1:-1;

            if(this.controls.left){
                this.angle+=0.015*flip
            }
        
            if(this.controls.right){
                this.angle-=0.015*flip
            }
        
    
        }
        
        if(this.speed>this.MaxSpeed){this.speed=this.MaxSpeed}
        if(this.speed<-this.MaxSpeed/4){this.speed=-this.MaxSpeed/4}
        if(this.speed>0){this.speed-=this.friction}
        if(this.speed<0){this.speed+=this.friction}
        if(Math.abs(this.speed)<this.friction){this.speed=0}
        this.x-= Math.sin(this.angle)*this.speed
        this.y-= Math.cos(this.angle)*this.speed
    }

 draw(ctx){ 
    ctx.save()
    ctx.translate(this.x,this.y)
    ctx.rotate(-this.angle)
    
    ctx.beginPath();

    ctx.rect(

    -this.width/2,
    -this.height/2,
    this.width,
    this.height
    );

    ctx.fill();

    ctx.restore();
}
}


