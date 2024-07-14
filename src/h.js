import * as THREE from 'three'

//Airplane
export class Airplane{
  constructor() {
      this.pos = new THREE.Vector3(0, 0, 0);
      this.v = new THREE.Vector3(0, 0, 0);
    }
    calc(dt) {
          
          this.pos.add(this.v.clone().multiplyScalar(dt));
  }
  
}
export class Person1{
  constructor() {
      this.pos = new THREE.Vector3(0, 0, 0);
      this.v = new THREE.Vector3(0, 0, 0);
      
    }
    calc(dt) {
          
          this.pos.add(this.v.clone().multiplyScalar(dt));
  }
  
}


// normal move
   export class Parachute1{
    constructor(r=4,area=Math.PI*r*r,m=50000,
        pos= new THREE.Vector3(0,0,0)
        ,v= new THREE.Vector3(0, 0, 0),a= new THREE.Vector3(0, 0, 0)
        ,cd=0.75,g=new THREE.Vector3(0, -9.8, 0)) {
        this.r= r;
        this.area = area;
        this.m = m;
         this.cd=cd;
         this.g = g;
        this.pos =pos;
        this.v = v;
        this.a = a;
    
      }
      calc(dt) {
        //var aa = this.AOA();
        this.a = this.TotalForce().clone().multiplyScalar(1 / this.m);
        this.v.add(this.a.clone().multiplyScalar(dt));
        this.pos.add(this.v.clone().multiplyScalar(dt));
      }
      weight() {
       // var g = new THREE.Vector3(0, -9.8, 0);
        const f =this.g.clone().multiplyScalar(this.m);
        // f = m*g
        return f;
      }

      drag() {
        var vv = this.v.length();
         const airDensity=1.225;
        const AirF = 0.5 * airDensity * vv * vv * this.cd * this.area;
        var airVactor = this.v.clone().normalize();
        airVactor = airVactor.clone().multiplyScalar(-AirF);
        return airVactor;
      }
      TotalForce() {
        var f = new THREE.Vector3();
        f.add(this.weight());
        f.add(this.drag());
       
        return f;
      }
      FaceDown() {
        var FDown = new THREE.Vector3(15, -1, 0);
        return FDown;
      }
      AOA() {
        var c = this.FaceDown().clone().cross(this.v);
    
        var vl = this.v.length();
        var FDownl = this.FaceDown().length();
        var cl = c.length()
        if (vl * FDownl > 0.001) {
          var ss = cl / (vl * FDownl);
    
          var aoa = Math.asin(ss);
          console.log(aoa);
    
          return aoa;
        } else
          return 0;
      }
   }
   // left side winds
   export class Parachute2 extends Parachute1{
    constructor(r=4,area=Math.PI*r*r,m=50000,
        pos= new THREE.Vector3(0, 0, 0)
        ,v= new THREE.Vector3(0, 0, 0),a= new THREE.Vector3(0, 0, 0),
        cl=0.75,cd=0.75,g = new THREE.Vector3(-9.8, -9.8, 0)
        ) { 
    super(r,area,m,v,a,pos,cd,g)
     this.cl=cl
    
    }
    weight() {
      
       // var g = new THREE.Vector3(-9.8, -9.8, 0);
        const f = this.g.clone().multiplyScalar(this.m);
        // f = m*g
        return f;
      }
    c_l(){
        return this.cl *this.AOA();
    }
    drag(){
        var airDensity=1.225;
    var vv = this.v.length();
    const AirF = 0.5 * airDensity * vv * vv * this.c_l()* this.area;
    var airVactor = this.v.clone().normalize();
    airVactor = airVactor.clone().multiplyScalar(-AirF);
     return airVactor;
    }
    // عزم قوة الرياح
    torque(){
        const d =0.7;
        const airDensity=1.225;
        var vv = this.v.length();
        const AirF = 0.5 * airDensity * vv * vv *this.cd*d* this.area;
        var airVactor = this.v.clone().normalize();
        airVactor = airVactor.clone().multiplyScalar(-AirF);
         return airVactor;
    }
        TotalForce(){
            var f = new THREE.Vector3();
            f.add(this.weight());
            f.add(this.drag());
            f.add(this.torque());
            return f;
        }
   }
   // right side winds
   export class Parachute3 extends Parachute1{
    constructor(r=4,area=Math.PI*r*r,m=50000,
        pos= new THREE.Vector3(0, 0, 0)
        ,v= new THREE.Vector3(0, 0, 0),a= new THREE.Vector3(0, 0, 0),
        cl=0.75,cd=0.75,g = new THREE.Vector3(9.8, -9.8, 0)
        ) { 
    super(r,area,m,v,a,pos,cd,g)
     this.cl=cl
    }
    weight() {
        //var g = new THREE.Vector3(9.8, -9.8, 0);
        const f = this.g.clone().multiplyScalar(this.m);
        // f = m*g
        return f;
      }
    c_l(){
        return this.cl *this.AOA();
    }
    drag(){
        var airDensity=1.225;
    var vv = this.v.length();
    const AirF = 0.5 * airDensity * vv * vv * this.c_l()* this.area;
    var airVactor = this.v.clone().normalize();
    airVactor = airVactor.clone().multiplyScalar(-AirF);
     return airVactor;
    }
    // عزم قوة الرياح
    torque(){
        const d =0.7;
        const airDensity=1.225;
        var vv = this.v.length();
        const AirF = 0.5 * airDensity * vv * vv *this.cd*d* this.area;
        var airVactor = this.v.clone().normalize();
        airVactor = airVactor.clone().multiplyScalar(-AirF);
         return airVactor;
    }
        TotalForce(){
            var f = new THREE.Vector3();
            f.add(this.weight());
            f.add(this.drag());
            f.add(this.torque());
            return f;
        }
   }
      // front winds
      export class Parachute4 extends Parachute3{
        constructor(r=4,area=Math.PI*r*r,m=50000,
            pos= new THREE.Vector3(0, 0, 0)
            ,v= new THREE.Vector3(0, 0, 0),a= new THREE.Vector3(0, 0, 0),
            cl=0.75,cd=0.75,g = new THREE.Vector3(0, -9.8, 9.8)
            ) {
        super(r,area,m,v,a,pos,cd,cl,g)
         
        }
        weight() {
            //this.g=.................?
            //var g = new THREE.Vector3(0, -9.8, 9.8);
            const f = this.g.clone().multiplyScalar(this.m);
            // f = m*g
            
            return f;
          }
        AOA(){
            var c = this.FaceDown().clone().cross(this.v);
    
            var vl = this.v.length();
            var FDownl = this.FaceDown().length();
            var cl = c.length()
            if (vl * FDownl > 0.001) {
              var ss = cl / (vl * FDownl);
        
              var aoa = Math.acos(ss);
              console.log(aoa);
        
              return aoa;
            } else
              return 0;  
        }

    }
    // back winds
    export class Parachute5 extends Parachute3{
      constructor(r=4,area=Math.PI*r*r,m=50000,
          pos= new THREE.Vector3(0, 0, 0)
          ,v= new THREE.Vector3(0, 0, 0),a= new THREE.Vector3(0, 0, 0),
          cl=0.75,cd=0.75,g = new THREE.Vector3(0, -9.8, -9.8)
          ) {
      super(r,area,m,v,a,pos,cd,cl,g)
       
      }
      weight() {
          //this.g=.................?
          //var g = new THREE.Vector3(0, -9.8, -9.8);
          const f = this.g.clone().multiplyScalar(this.m);
          // f = m*g
          if(this.g.z==-9.8){this.g.z=9.8}
          return f;
        }
      AOA(){
          var c = this.FaceDown().clone().cross(this.v);
  
          var vl = this.v.length();
          var FDownl = this.FaceDown().length();
          var cl = c.length()
          if (vl * FDownl > 0.001) {
            var ss = cl / (vl * FDownl);
      
            var aoa = Math.acos(ss);
            console.log(aoa);
      
            return aoa;
          } else
            return 0;  
      }}
  //human left
  export class Parachute6 extends Parachute2{
    constructor(r=4,area=Math.PI*r*r,m=50000,
      pos= new THREE.Vector3(0, 0, 0)
      ,v= new THREE.Vector3(0, 0, 0),a= new THREE.Vector3(0, 0, 0),
      cl=0.75,cd=0.75,g=new THREE.Vector3(-9.8, -9.8, 0)
      ) { 
  super(r,area,m,v,a,pos,cd,cl,g)
       
      }
      g=new THREE.Vector3(9.8, -9.8, 0)
  }
//human right
export class Parachute7 extends Parachute3{
  constructor(r=4,area=Math.PI*r*r,m=50000,
    pos= new THREE.Vector3(0, 0, 0)
    ,v= new THREE.Vector3(0, 0, 0),a= new THREE.Vector3(0, 0, 0),
    cl=0.75,cd=0.75,g = new THREE.Vector3(9.8, -9.8, 0)
    ) { 
super(r,area,m,v,a,pos,cd,cl,g)}
    g=new THREE.Vector3(-9.8, -9.8, 0)
}
//human front
export class Parachute8 extends Parachute4{
  constructor(r=4,area=Math.PI*r*r,m=50000,
    pos= new THREE.Vector3(0, 0, 0)
    ,v= new THREE.Vector3(0, 0, 0),a= new THREE.Vector3(0, 0, 0),
    cl=0.75,cd=0.75,g = new THREE.Vector3(0, -9.8, 9.8)
    ) {
super(r,area,m,v,a,pos,cd,cl,g)}
    g=new THREE.Vector3(0, -9.8, -9.8)
}
//human back
export class Parachute9 extends Parachute5{
  constructor(r=4,area=Math.PI*r*r,m=50000,
    pos= new THREE.Vector3(0, 0, 0)
    ,v= new THREE.Vector3(0, 0, 0),a= new THREE.Vector3(0, 0, 0),
    cl=0.75,cd=0.75,g = new THREE.Vector3(0, -9.8, -9.8)
    ) {
super(r,area,m,v,a,pos,cd,cl,g)
 }
    g=new THREE.Vector3(0, -9.8, 9.8)
}


  