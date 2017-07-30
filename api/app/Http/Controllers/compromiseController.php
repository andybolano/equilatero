<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use DB;
use App\Compromise;
define('URL_SERVER', 'http://' . $_SERVER['HTTP_HOST'] . '/equilatero/api/');

class compromiseController extends Controller {
    
     public function index() {
          return Compromise::All();
    }
    
    public function getActivos() {
              $data = DB::select(DB::raw("SELECT * FROM compromiso_social WHERE estado = 'ACTIVO' "));
              return $data;
    }
    
     public function store(Request $request) {
        try {
            $data = $request->all();
           
            if ($request->hasFile('imagen')) {
                $compromise = new Compromise();
                $compromise->nombre = $data['nombre'];
                $compromise->descripcion = $data['descripcion'];
                $compromise->save();
                
                $compromise->url = URL_SERVER . "images/compromise/" . $compromise->id . ".png";
                $compromise->save();
                
                $request->file('imagen')->move("../images/compromise", $compromise->id . ".png");
                return JsonResponse::create(array('message' => "Compromiso social '" . $compromise->nombre . "' registrada Correctamente", "request" => json_encode($data)), 200);
            }else{
                return JsonResponse::create(array('message' => "No se econtro imagen de la compromiso social"), 402);
            }
                
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No pudimos registrar la compromiso, intentelo de nuevo", "exception" => $exc->getMessage(), "respuesta" => false, "request" => json_encode($data)), 401);
        }
    }
    
     public function update(Request $request) {
        try {
            $data = $request->all();
            $id = $data['id'];
            $compromise = Compromise::find($id);
            $compromise->nombre = $data['nombre'];
            $compromise->descripcion = $data['descripcion'];
            $compromise->estado = $data['estado'];
            $compromise->save();
             if ($request->hasFile('imagen')) {
                 $request->file('imagen')->move("../images/compromise", $compromise->id . ".png");
             }
            return JsonResponse::create(array('message' => "Compromiso social  Modificada Correctamente", "request" => json_encode($data)), 200);
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo Modificar la compromiso", "exception" => $exc->getMessage(), "request" => json_encode($data)), 401);
        }
    }
    

}

