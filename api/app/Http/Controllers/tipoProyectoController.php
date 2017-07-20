<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use DB;
use App\Tipo_proyecto;

class tipoProyectoController extends Controller {
    public function index(){
        return Tipo_proyecto::All();
    }
    
    public function store(Request $request){
        try {
        $data = $request->all();
        $tipo = new Tipo_proyecto();
        $tipo->nombre = $data['nombre'];
        $tipo->save();
        
        return JsonResponse::create(array('message' => "Tipo de proyecto '" . $tipo->nombre . "' registrado Correctamente", "request" => json_encode($data)), 200);
        
         } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No pudimos registrar el tipo de proyecto, intentelo de nuevo", "exception" => $exc->getMessage(), "respuesta" => false, "request" => json_encode($data)), 401);
        }
    }
    
    public function show($id) {
        try {
            return Tipo_proyecto::find($id);
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }
    
     public function update(Request $request, $id) {
        try {
            $data = $request->all();
            $tipo = Tipo_proyecto::find($id);
            $tipo->nombre = $data['nombre'];
            $tipo->save();
            return JsonResponse::create(array('message' => "Tipo de proyecto " . $tipo->nombre . " Modificado Correctamente", "request" => json_encode($data)), 200);
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo Modificar el tipo de proyectos", "exception" => $exc->getMessage(), "request" => json_encode($data)), 401);
        }
    }
    
    public function destroy($id) {
        try {
            $tipo = Tipo_proyecto::find($id);
            $tipo->delete();
            return JsonResponse::create(array('message' => "Tipo de proyecto eliminado con exito!", "request" => json_encode($id)), 200);
        } catch (Exception $ex) {
            return JsonResponse::create(array('message' => "No se pudo Eliminar el tipo de proyecto", "exception" => $ex->getMessage(), "request" => json_encode($id)), 401);
        }
    }
    
}
