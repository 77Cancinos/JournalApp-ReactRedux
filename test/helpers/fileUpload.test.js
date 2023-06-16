import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

//Configuración del cloudinary
cloudinary.config({
    cloud_name: 'daa7ymjlz',
    api_key: '395171532415975',
    api_secret: 'FryCcc7ZnI03XoT95UYlRqS0S28',
    secure: true
});

describe('Pruebas en el file Upload', () => {

    test('debe de subir el archivo correctamente cloudinary', async () => {

        // const imgURL = 'https://westernpriorities.org/wp-content/uploads/2021/10/GrandTeton_Swabacher-Landing-Sunset_Tobiason_NPS_Flickr.jpg';
        // const resp = await fetch(imgURL);
        // const blob = await resp.blob();
        // const file = new File([blob], 'foto.jpg');

        // const url = await fileUpload(file);
        // expect(typeof url).toBe('string');

        // //Despues de subir la imagen las borramos
        // const segments = url.split('/');
        // const imageId = segments[segments.length - 1].replace('.jpg', '');
        // console.log(imageId);

        // const cloudResp = await cloudinary.api.delete_resources(['journal/' + imageId], {
        //     resource_type: 'image'
        // });
        // // console.log({ cloudResp });

    });


    test('Debe de retornar null', async () => {

        // const file = new File([], 'foto.jpg');
        // const url = await fileUpload(file);
        // expect(typeof url).toBe(null);


    });


});