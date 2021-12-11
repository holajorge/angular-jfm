import { environment } from "src/environments/environment";
const base_url = environment.base_url;

export class Usuario{
    
    constructor(
        public nombre :string, 
        public email:string, 
        public password?:string,
        public img?:string, 
        public role?:string, 
        public google?:boolean, 
        public usuario_id?:string
    ){}

    get imgProfile(){
        
        if(!this.img){
            return `${base_url}/upload/usuarios/default`;
        }else if(this.img?.includes('https')){
            return this.img;
        }else if(this.img){
            return `${base_url}/upload/usuarios/${this.img}`;
        }else{        
            return `${base_url}/upload/usuarios/default`;
        }
        
    }
}