<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use DB;
use App\Tipos_planos;

class tipoPlanoController extends Controller {
    
     public function index(){
        return Tipos_planos::All();
    }
    
     public function store(Request $request){
        try {
        $data = $request->all();
        $tipo = new Tipos_Planos();
        $tipo->nombre = $data['nombre'];
        $tipo->save();
        
        return JsonResponse::create(array('message' => "Tipo de plano'" . $tipo->nombre . "' registrado Correctamente", "request" => json_encode($data)), 200);
        
         } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No pudimos registrar el tipo de plano, intentelo de nuevo", "exception" => $exc->getMessage(), "respuesta" => false, "request" => json_encode($data)), 401);
        }
    }
    
     public function show($id) {
        try {
            return Tipos_planos::find($id);
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }
    
    public function update(Request $request, $id) {
        try {
            $data = $request->all();
            $tipo = Tipos_planos::find($id);
            $tipo->nombre = $data['nombre'];
            $tipo->save();
            return JsonResponse::create(array('message' => "Tipo de plano " . $tipo->nombre . " Modificado Correctamente", "request" => json_encode($data)), 200);
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo Modificar el tipo de plano", "exception" => $exc->getMessage(), "request" => json_encode($data)), 401);
        }
    }
    
    public function destroy($id) {
        try {
            $tipo = Tipos_planos::find($id);
            $tipo->delete();
            return JsonResponse::create(array('message' => "Tipo de plano eliminado con exito!", "request" => json_encode($id)), 200);
        } catch (Exception $ex) {
            return JsonResponse::create(array('message' => "No se pudo Eliminar el tipo de plano", "exception" => $ex->getMessage(), "request" => json_encode($id)), 401);
        }
    }
}
