class Car{
    constructor(x,y,width,height,CType,MaxSpeed=3){
        this.x = x;
        this.y = y
        this.width = width;
        this.height = height;
        this.speed = 0;
        this.acceleration = 0.05;
        this.MaxSpeed=MaxSpeed;
        this.friction = 0.01;
        this.angle=0
        this.damaged = false
        
        if(CType!=="DUMMY"){this.sensor = new Sensor(this)}
        //this.sensor = new Sensor(this)
        this.controls = new Controls(CType)

    }

    update(roadBorders,traffic){

        if(!this.damaged){

        this.#move()
        this.polygon = this.#createPolygon()
        this.damaged=this.#checkDamage(roadBorders,traffic);
        
        }
        if(this.sensor){this.sensor.update(roadBorders,traffic);}

       
    

    }

    #checkDamage(roadBorders,traffic){
        for(let i=0;i<roadBorders.length;i++){
            if(polysIntersect(this.polygon,roadBorders[i])){
                return true
            }
        }
        for(let i=0;i<traffic.length;i++){
            if(polysIntersect(this.polygon,traffic[i].polygon)){
                return true
            }
        }
        return false
    }

    #createPolygon(){
        const points=[];
        const rad=Math.hypot(this.width,this.height)/2;
        const alpha=Math.atan2(this.width,this.height);
        points.push({
            x:this.x-Math.sin(this.angle-alpha)*rad,
            y:this.y-Math.cos(this.angle-alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(this.angle+alpha)*rad,
            y:this.y-Math.cos(this.angle+alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle-alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle-alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle+alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle+alpha)*rad
        });
        return points;
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

 draw(ctx,color){ 

    if(this.damaged){
        ctx.fillStyle="gray"
    }else{
        ctx.fillStyle=color
    }
    ctx.save()
    ctx.moveTo(this.polygon[0].x,this.polygon[0].y)
    for(let i=1;i<this.polygon.length;i++){
        ctx.lineTo(this.polygon[i].x,this.polygon[i].y)
    }
    ctx.fill();
    if(this.sensor){this.sensor.draw(ctx)}
    
}
}


