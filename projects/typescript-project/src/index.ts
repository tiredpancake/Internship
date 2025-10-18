//types

let id:number  = 5
let company:string ='Traversary Media'
let isPublished:boolean=true
let x:any='Hello '

let ids:number[] =[1,2,3]
let arr:any[] =[1,true,'mahsa']

// Tuple
let person: [number, string, boolean] = [1, 'Brad', true]
// Tuple Array
let employees: [number, string][]

employees=[
    [1,'Brad'],
    [2,'Jhon'],
    [3,'Jill']
]
//union  : when we have variabe which got two types  
let pid:string | number

//Enum

enum direction1
{
    up,
    down,left
    ,right
}


enum direction2{
    Up='up',
    Down='Down',
    Left='left',
    Right='Right'
}



// object
 type user ={
    id:number,
    name:string
 }

const User:user= {
    id:1,
    name:'jhon'
}

//type assertion

let cid:any =1

let customerId=<number>cid


let customerIdd =cid as number



//functions


function addNum(x :number,y: number):number
{
    return x+y
}
function log (message:string| number):void 
{
    console.log(message)
}



//interfacees

 interface UserInterface {
    id:number,
    name:string,
    readonly age?:number
 }

const User1:UserInterface= {
    id:1,
    name:'jhon'
}
//type can be with with union but interface cant 

//using inetrface with function 
interface mathFunc{
    (x:number,y:number):number
}

const add:mathFunc=( x:number ,y:number):number=>x+y
const sub:mathFunc=( x:number ,y:number):number=>x+y



 interface classuser {
    id:number,
    name:string,
    register():string
    
 }

//classes 

class Person implements classuser{
      id:number//access only by this class
     name:string //access by this class or any class got extended


    constructor(id:number,name:string)
    {
        this.id=id
        this.name=name


    }
    register()
    {
        return`${this.name} is registered`
    }
}

const brad =new Person(1,"reza")

class employeeee extends Person{

    position: string

    constructor(id:number,name:string,position:string)
    {
        super (id,name)
        this.position=position
    }

}

const emp=new employeeee(3,'shanw','developer')


console.log(emp.register())

//generics

function getArray<T>(items:T[]):T[]{
    return new Array().concat(items)
}


let numArray=getArray<number>([1,2,3,4])
let strArray=getArray<string>(['1','2','3','4'])

