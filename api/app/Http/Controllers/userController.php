<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use App\User;
use Mail;

class userController extends Controller {
    
     public function index() {
          return User::All();
    }
    
    
    public function postContacto(Request $request){
        try {
             $data = $request->all();

        $titulo = 'CONTACTO EQUILATERO';
        // mensaje
        $mensaje = $data['mensaje'];
       
        $cabeceras  = 'MIME-Version: 1.0' . "\r\n";
        $cabeceras .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
       
        $cabeceras .= 'To: <'.$data['email'].'>' . "\r\n";
        $cabeceras .= 'From: equilatero.com <info@mundoapuestas.co>' . "\r\n";        

        mail($data['email'], $titulo, $mensaje, $cabeceras);
            
            return JsonResponse::create(array('message' => "Su mensaje ha sido enviado con exito", "respuesta" => false), 200);
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo enviar su mensaje", "exception" => $exc->getMessage(), "request" => json_encode($data)), 401);
        }
    }
    public function postPostventa(Request $request){
        try {
             $data = $request->all();

        $titulo = 'POSTVENTA EQUILATERO';
        // mensaje
        $mensaje = $data['comentarios'];
       
        $cabeceras  = 'MIME-Version: 1.0' . "\r\n";
        $cabeceras .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
       
        $cabeceras .= 'To: <'.$data['email'].'>' . "\r\n";
        $cabeceras .= 'From:equilatero.com' . "\r\n";        

        mail($data['email'], $titulo, $mensaje, $cabeceras);
            
            return JsonResponse::create(array('message' => "Su mensaje ha sido enviado con exito", "respuesta" => false), 200);
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo enviar su mensaje", "exception" => $exc->getMessage(), "request" => json_encode($data)), 401);
        }
    }
    
     public function postCotizacion(Request $request){
        try {
             $data = $request->all();

        $titulo = 'POSTVENTA EQUILATERO';
        // mensaje
        $mensaje = $data['nombre'];
       
        $cabeceras  = 'MIME-Version: 1.0' . "\r\n";
        $cabeceras .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
       
        $cabeceras .= 'To: <'.$data['email'].'>' . "\r\n";
        $cabeceras .= 'From:equilatero.com' . "\r\n";        

        mail($data['email'], $titulo, $mensaje, $cabeceras);
            
            return JsonResponse::create(array('message' => "Su mensaje ha sido enviado con exito", "respuesta" => false), 200);
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo enviar su mensaje", "exception" => $exc->getMessage(), "request" => json_encode($data)), 401);
        }
    }
     public function update(Request $request , $id) {
        try {
            $data = $request->all();
            $usuario = User::find($id);
            
            if (password_verify($data['pass'], $usuario->clave)) {
                 if ($data['passNueva'] !== false) {
                       $usuario->clave = Hash::make($data['passNueva']);
                  }
            $usuario->usuario = $data['usuario'];
            $usuario->telefono = $data['telefono'];
            $usuario->direccion = $data['direccion'];
            $usuario->email = $data['email'];
            $usuario->save();
            }else{
                 return JsonResponse::create(array('message' => "Contraseña proporcionada es incorrecta.", "respuesta" => false), 200);
            }
            return JsonResponse::create(array('message' => "Usuario  Modificado Correctamente", "request" => json_encode($data)), 200);
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo Modificar la usuario", "exception" => $exc->getMessage(), "request" => json_encode($data)), 401);
        }
    }
    

}


