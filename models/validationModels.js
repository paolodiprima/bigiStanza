const Joi = require('@hapi/joi');

const schemaValidationContract = {
    idroom : Joi.any().optional(),
    HolderName: Joi.string().min(3).max(30).required(),
    HolderSurname : Joi.string().min(3).max(30).required(),
    HolderDoB : Joi.date().empty('').optional(),
    HolderJob: Joi.string().valid(['Studente','Lavoratore']),
    inDate: Joi.date().empty(''),
    outDate: Joi.date().empty('').greater(Joi.ref('inDate')),
    indexContract: Joi.number().integer()

}

const schemaValidationAppart = {
    appartid:Joi.any().required(),
    internalName: Joi.any().required(),
    city: Joi.any().optional(),
    citycode: Joi.any().required(),
    address: Joi.any().required(),
    cap:Joi.any().required(),
    numRooms:Joi.number().integer().less(7),
    floor :Joi.number().integer().greater(-1),
    numBathrooms :Joi.any().optional(),
    appartsize:Joi.any().optional(),
    services:Joi.any().optional(),
    description:Joi.any().optional(),
    roomsize1:Joi.any().required(),
    price1:Joi.any().required(),
    accesso1:Joi.any().optional(),
    roomsize2:Joi.any().optional(),
    price2:Joi.any().optional(),
    accesso2:Joi.any().optional(),
    roomsize3:Joi.any().optional(),
    price3:Joi.any().optional(),
    accesso3:Joi.any().optional(),
    roomsize4:Joi.any().optional(),
    price4:Joi.any().optional(),
    accesso4:Joi.any().optional(),
    roomsize5:Joi.any().optional(),
    price5:Joi.any().optional(),
    accesso5:Joi.any().optional(),
    roomsize6:Joi.any().optional(),
    price6:Joi.any().optional(),
    accesso6:Joi.any().optional()
}

const schemaValildationSender = {
    name: Joi.string().min(3).max(20).required(),
    cognome: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    numeroTel: Joi.any().optional(),
    attivita: Joi.string().valid(['Studente','Lavoratore']),
    entrata: Joi.date().empty(''),
    uscita: Joi.date().empty('').greater(Joi.ref('entrata')),
    msg : Joi.string().max(256)
}

const rangeDateValidation = function (newDateIn,newDateOut,contracts){
        let validRange = true;
            for (let i=0 ; i< parseInt(contracts.length);i++){
               
                if (newDateIn > contracts[i].outDate) {
                    console.log(`${newDateIn} > ${contracts[i].outDate}`)
                    console.log('interno valid range 1: ' + validRange);
                    continue;
                }
                 else if  (newDateOut <  contracts[i].inDate) {
                     
                     console.log(`${newDateOut} < ${contracts[i].inDate}`);
                     console.log('interno valid range 2: ' + validRange);
                     continue;
                }
                    else {
                            validRange = false;
                            break;
                    }
            } // for
            console.log('interno valid range finale: ' + validRange);
        return validRange;
}


const validationUserSchema =  {
        name:      Joi.string().min(3).required(),
        email :    Joi.string().min(6).email()
                        .options({
                            language: {
                                string: { min: ' minimo di 6 caratteri',
                                email : 'indirizzo email non valido'},
                            }
                        }),
        password : Joi.string().min(8).required(),
        role         : Joi.string()
    };

 const validationLoginSchema =  {
        name:      Joi.string().min(3).required(),
        password : Joi.string().required(),
 };
  


module.exports = {
    "schemaValidationAppart"  : schemaValidationAppart,
    "schemaValildationSender" : schemaValildationSender,
    "schemaValidationContract": schemaValidationContract,
    "rangeDateValidation"     : rangeDateValidation,
    "validationUserSchema"    : validationUserSchema,
    "validationLoginSchema"   : validationLoginSchema
};