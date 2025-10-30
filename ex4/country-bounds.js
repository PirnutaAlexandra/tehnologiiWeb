
const textProcessor = (algo, operation, input, options) => {

    if(algo === "rle"){

            if(typeof operation !=="boolean")
                throw Error (`Invalid Type`);

            if(operation === true){
            if(typeof input !=="string" && !(input instanceof String ))
                        throw Error (`InvalidType`);
        }

            if(input instanceof String)
                input=input.toString();

            if(input === "")
                return "";

            for(let i=0; i<input.length; i++)
                if(input[i]>='0' && input[i]<='9' )
                    throw Error (`InvalidInput`);

           let contor =1;
           let newInput="";
           for(let j=0; j<input.length; j++)
               if(input[j] === input[j+1])
                    contor++
                else
                {   
                    newInput+=contor + input[j];
                    contor=1;
                }    
            return newInput;
            }    


        if (algo === "caesar"){

             if(typeof operation !=="boolean")
                throw Error (`Invalid Type`);
            
              if(typeof input !=="string" && !(input instanceof String ))
                        throw Error (`InvalidType`);
             
               if(input === "")
                return "";
            
              for(let i=0; i<input.length; i++)
                if(!((input[i] >= 'A' && input[i] <= 'z') || input[i] ===' '))
                    throw Error (`InvalidInput`);

            if(!("shift" in options))
                throw Error (`InvalidInput`);
            else
            {
                const shift=((options.shift%26)+26)%26;
                const upper="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                const lower="abcdefghijklmnopqrstuvwxyz";
                let result="";

                for(let i=0; i<input.length; i++)
                  {
                    const l=input[i];

                    if(upper.includes(l)){
                        let index=upper.indexOf(l);

                     if(operation === true){
                        index=(index + shift)%26;
                    }else{
                        index=(index-shift+26)%26;
                    }
                    result +=upper[index];
                }
                  else if (lower.includes(l)){
                        let index=lower.indexOf(l);
                        if(operation === true){
                            index=(index+shift)%26;
                            
                        }else{
                            index=(index-shift +26)%26;
                        }
                        result +=lower[index];
                  }
                  else {
                    result+=l;
                  }
            }

            return result;
         
        }

        }
        


    
}

module.exports = {
    textProcessor
}

