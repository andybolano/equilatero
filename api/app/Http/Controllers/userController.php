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
        $usuario = User::find(1);
        
        $titulo = 'CONTACTO EQUILATERO';
        // mensaje
        $mensaje = '
        <table style="background-color: #f6f6f6;width: 100%;">
    <tbody><tr>
        <td></td>
        <td  width="600" style="display: block !important;max-width: 600px !important;margin: 0 auto !important;clear: both !important;">
            <div style="max-width: 600px;margin: 0 auto;display: block;padding: 20px;">
                <table style="background: #fff;border: 1px solid #e9e9e9;border-radius: 3px;" width="100%" cellpadding="0" cellspacing="0">
                    <tbody><tr>
                        <td style="padding: 20px;">
                            <table cellpadding="0" cellspacing="0">
                                <tbody><tr>
                                    <td>
                                        <img class="img-responsive" src="https://birriassoccer.com/equilatero/public_html/page/img/header-email.png">
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0 0 20px;">
                                        <h3>Nuevo mensaje de contacto!</h3>
                                    </td>
                                </tr>
                                <tr>
                                <td>
                                  <b>Email:</b> '.$data["email"].'
                                </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0 0 20px;">
                                      <b>Mensaje:</b><br> '.$data["mensaje"].'
                                    </td>
                                </tr>
                              </tbody></table>
                        </td>
                    </tr>
                </tbody></table>
                <div style="width: 100%;clear: both;color: #999;padding: 20px;">
                    <table width="100%">
                        <tbody><tr>
                            
                        </tr>
                    </tbody></table>
                </div></div>
        </td>
        <td></td>
    </tr>
</tbody></table>
        ';
       
        $cabeceras  = 'MIME-Version: 1.0' . "\r\n";
        $cabeceras .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
       
        $cabeceras .= 'To: <'.$data['email'].'>' . "\r\n";
        $cabeceras .= 'From: equilatero.com'. "\r\n";        

        mail($usuario->email, $titulo, $mensaje, $cabeceras);
            
            return JsonResponse::create(array('message' => "Su mensaje ha sido enviado con exito", "respuesta" => false), 200);
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo enviar su mensaje", "exception" => $exc->getMessage(), "request" => json_encode($data)), 401);
        }
    }
    public function postPostventa(Request $request){
        try {
             $data = $request->all();
$usuario = User::find(1);
        $titulo = 'POSTVENTA EQUILATERO';
        // mensaje
       $mensaje = '
        <table style="background-color: #f6f6f6;width: 100%;">
    <tbody><tr>
        <td></td>
        <td  width="600" style="display: block !important;max-width: 600px !important;margin: 0 auto !important;clear: both !important;">
            <div style="max-width: 600px;margin: 0 auto;display: block;padding: 20px;">
                <table style="background: #fff;border: 1px solid #e9e9e9;border-radius: 3px;" width="100%" cellpadding="0" cellspacing="0">
                    <tbody><tr>
                        <td style="padding: 20px;">
                            <table cellpadding="0" cellspacing="0">
                                <tbody><tr>
                                    <td>
                                        <img class="img-responsive" src="https://birriassoccer.com/equilatero/public_html/page/img/header-email.png">
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0 0 20px;">
                                        <h3>Nuevo mensaje de postventas!</h3>
                                    </td>
                                </tr>
                                <tr>
	                                <td>
	                                  <b>Proyecto:</b> '.$data["proyecto"].'<br><br>
	                                </td>
                                </tr>
                                <tr>
	                                <td>
	                                  <b>Nombre:</b> '.$data["nombre"].'<br><br>
	                                </td>
                                </tr>
                                <tr>
	                                <td>
	                                  <b>Cedula:</b> '.$data["cedula"].'<br><br>
	                                </td>
                                </tr>
                                <tr>
	                                <td>
	                                  <b>Email:</b> '.$data["email"].'<br><br>
	                                </td>
                                </tr>
                                <tr>
	                                <td>
	                                  <b>Telefono:</b> '.$data["telefono"].'<br><br>
	                                </td>
                                </tr>
                                <tr>
	                                <td>
	                                  <b>Tipo de inmueble:</b> '.$data["tipoInmueble"].'<br><br>
	                                </td>
                                </tr>
                                <tr>
	                                <td>
	                                  <b>Tipo de postventa:</b> '.$data["tipoPostventa"].'<br><br>
	                                </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0 0 20px;">
                                      <b>Comentarios:</b><br> '.$data["comentarios"].'
                                    </td>
                                </tr>
                              </tbody></table>
                        </td>
                    </tr>
                </tbody></table>
                <div style="width: 100%;clear: both;color: #999;padding: 20px;">
                    <table width="100%">
                        <tbody><tr>
                            
                        </tr>
                    </tbody></table>
                </div></div>
        </td>
        <td></td>
    </tr>
</tbody></table>
        ';
       
        $cabeceras  = 'MIME-Version: 1.0' . "\r\n";
        $cabeceras .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
       
        $cabeceras .= 'To: <'.$data['email'].'>' . "\r\n";
        $cabeceras .= 'From:equilatero.com' . "\r\n";        

        mail($usuario->email, $titulo, $mensaje, $cabeceras);
            
            return JsonResponse::create(array('message' => "Su mensaje ha sido enviado con exito", "respuesta" => false), 200);
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo enviar su mensaje", "exception" => $exc->getMessage(), "request" => json_encode($data)), 401);
        }
    }
    
     public function postCotizacion(Request $request){
        try {
             $data = $request->all();
        $usuario = User::find(1);
        $titulo = 'COTIZACION';
        // mensaje
         $mensaje = '
        <table style="background-color: #f6f6f6;width: 100%;">
    <tbody><tr>
        <td></td>
        <td  width="600" style="display: block !important;max-width: 600px !important;margin: 0 auto !important;clear: both !important;">
            <div style="max-width: 600px;margin: 0 auto;display: block;padding: 20px;">
                <table style="background: #fff;border: 1px solid #e9e9e9;border-radius: 3px;" width="100%" cellpadding="0" cellspacing="0">
                    <tbody><tr>
                        <td style="padding: 20px;">
                            <table cellpadding="0" cellspacing="0">
                                <tbody><tr>
                                    <td>
                                        <img class="img-responsive" src="https://birriassoccer.com/equilatero/public_html/page/img/header-email.png">
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0 0 20px;">
                                        <h3>Nuevo mensaje de cotizacion!</h3>
                                    </td>
                                </tr>
                                <tr>
	                                <td>
	                                  <b>Proyecto:</b> '.$data["proyecto"].'<br><br>
	                                </td>
                                </tr>
                                <tr>
	                                <td>
	                                  <b>Nombre:</b> '.$data["nombre"].'<br><br>
	                                </td>
                                </tr>
                                <tr>
	                                <td>
	                                  <b>Email:</b> '.$data["email"].'<br><br>
	                                </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0 0 20px;">
                                      <b>Comentarios:</b><br> '.$data["comentarios"].'
                                    </td>
                                </tr>
                              </tbody></table>
                        </td>
                    </tr>
                </tbody></table>
                <div style="width: 100%;clear: both;color: #999;padding: 20px;">
                    <table width="100%">
                        <tbody><tr>
                            
                        </tr>
                    </tbody></table>
                </div></div>
        </td>
        <td></td>
    </tr>
</tbody></table>
        ';
       
        $cabeceras  = 'MIME-Version: 1.0' . "\r\n";
        $cabeceras .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
       
        $cabeceras .= 'To: <'.$data['email'].'>' . "\r\n";
        $cabeceras .= 'From:equilatero.com' . "\r\n";        

        mail($usuario->email, $titulo, $mensaje, $cabeceras);
            
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


