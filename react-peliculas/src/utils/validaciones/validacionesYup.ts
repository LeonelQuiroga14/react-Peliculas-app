import * as Yup from 'yup'
const configurarValidaciones = () => {
//Strings 
Yup.addMethod(Yup.string, 'primerLetraMayuscula',function(){
   return this.test('primerLetraMayuscula',"La primer letra debe ser mayuscula",
   (value)=>{
       if(value && value.length>0){
           const primerLetra = value.substring(0,1);
           return primerLetra === primerLetra.toUpperCase();
       }
       return true;
   }) 
})

}
export default configurarValidaciones;