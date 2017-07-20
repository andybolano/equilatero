<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use DB;
use App\Zone;
define('URL_SERVER', 'http://' . $_SERVER['HTTP_HOST'] . '/equilatero/api/');

class zoneController extends Controller {
    
     public function index() {
          return Zone::All();
    }
    
     public function store(Request $request) {
        try {
            $data = $request->all();
           
            if ($request->hasFile('imagen')) {
                $zone = new Zone();
                $zone->nombre = $data['nombre'];
                $zone->save();
                
                $zone->url = URL_SERVER . "images/zone/" . $zone->id . ".png";
                $zone->save();
                
                $request->file('imagen')->move("../images/zone", $zone->id . ".png");
                return JsonResponse::create(array('message' => "Zona comun '" . $zone->nombre . "' registrada Correctamente", "request" => json_encode($data)), 200);
            }else{
                return JsonResponse::create(array('message' => "No se econtro imagen de la zona comun"), 402);
            }
                
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No pudimos registrar la zona, intentelo de nuevo", "exception" => $exc->getMessage(), "respuesta" => false, "request" => json_encode($data)), 401);
        }
    }
    
     public function update(Request $request) {
        try {
            $data = $request->all();
            $id = $data['id'];
            $zone = Zone::find($id);
            $zone->nombre = $data['nombre'];
            $zone->save();
             if ($request->hasFile('imagen')) {
                 $request->file('imagen')->move("../images/zone", $zone->id . ".png");
             }
            return JsonResponse::create(array('message' => "Zona comun  Modificada Correctamente", "request" => json_encode($data)), 200);
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo Modificar la zona", "exception" => $exc->getMessage(), "request" => json_encode($data)), 401);
        }
    }
    

}

