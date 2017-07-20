<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use DB;
use App\Proyecto_basic;
use App\Proyecto_plano;
use App\Proyectos;
use App\Tipos_proyectos;
use App\Tipos_planos;

define('URL_SERVER', 'http://' . $_SERVER['HTTP_HOST'] . '/equilatero/api/');

class proyectoController extends Controller {
    
    public function save_plano(Request $request){
         $data = $request->all();
         if ($request->hasFile('imagen')) {
              $id = $data['idProyecto'];
                $tmpfname = time().substr(md5(microtime()), 0, rand(5, 12));
                $proyecto_plano= new Proyecto_plano();
                $proyecto_plano->url_plano = URL_SERVER . "images/planos/".$id."_".$tmpfname.".png";
                $proyecto_plano->titulo = $data['titulo'];
                $proyecto_plano->tipo = $data['tipo'];
                $proyecto_plano->valor_desde = $data['valor_desde'];
                $proyecto_plano->area_balcon = $data['area_balcon'];
                $proyecto_plano->area_construida = $data['area_construida'];
                $proyecto_plano->area_privada = $data['area_privada'];
                $proyecto_plano->estrato = $data['estrato'];
                $proyecto_plano->idProyecto = $data['idProyecto'];
                $proyecto_plano->save();
                
                $request->file('imagen')->move("../images/planos", $id."_".$tmpfname.".png");
                
                $plano = DB::select(DB::raw("SELECT proyecto_plano.*, tipos_planos.nombre as tipo_nombre FROM proyecto_plano INNER JOIN tipos_planos ON tipos_planos.id = proyecto_plano.tipo WHERE idProyecto = $id"));
                 return JsonResponse::create(array('message' => "Plano guardado Correctamente", "planos" => $plano), 200);
         }
    }
    
    public function save_galeria(Request $request){
        
          $data = $request->all();
           
            if ($request->hasFile('galeria')) {
                
                $id = $data['idProyecto'];
                $tmpfname = time().substr(md5(microtime()), 0, rand(5, 12));
                DB::table('proyecto_galeria')->insert(
                    ['galeria_url' => URL_SERVER . "images/galeria/".$id."_".$tmpfname.".jpg" , 'idProyecto' => $id]
                );

                $request->file('galeria')->move("../images/galeria", $id."_".$tmpfname.".jpg" );
                
                 $galeria = DB::select(DB::raw("SELECT * FROM proyecto_galeria WHERE idProyecto = $id"));
                
                return JsonResponse::create(array('message' => "Imagen guardada Correctamente", "galeria" => $galeria), 200);
                
                
            }else{
                return JsonResponse::create(array('message' => "No se encontro imagen"), 402);
            }
    }
    
    public function save_banner(Request $request){
        
          $data = $request->all();
           
            if ($request->hasFile('banner')) {
                $id = $data['idProyecto'];
                $proyecto = Proyectos::find($id);
                $proyecto->banner = 1;
                $proyecto->save();
                
                DB::table('proyecto_banner')->insert(
                    ['banner_url' => URL_SERVER . "images/banner/" . $id . ".jpg" , 'idProyecto' => $id]
                );

                $request->file('banner')->move("../images/banner", $id . ".jpg");
                return JsonResponse::create(array('message' => "Banner guardado Correctamente", "request" => $proyecto), 200);
                
            }else{
                return JsonResponse::create(array('message' => "No se encontro banner del proyecto"), 402);
            }
    }
    
    public function save_informaction_basic(Request $request){
        
          $data = $request->all();
           
            if ($request->hasFile('logo')) {
                if ($request->hasFile('brochure')) {
                $proyecto = new Proyectos();
                $proyecto->informacion_basica = 1;
                $proyecto->save();
                
                $proyecto_basic = new Proyecto_basic();
                $proyecto_basic->logo_url = URL_SERVER . "images/logos/" . $proyecto->id . ".png";
                $proyecto_basic->nombre = $data['nombre'];
                $proyecto_basic->tipo = $data['tipo'];
                $proyecto_basic->direccion = $data['direccion'];
                $proyecto_basic->pais = $data['pais'];
                $proyecto_basic->departamento = $data['departamento'];
                $proyecto_basic->municipio = $data['municipio'];
                $proyecto_basic->descripcion = $data['descripcion'];
                $proyecto_basic->brochure = URL_SERVER . "images/brochure/" . $proyecto->id . ".pdf";
                $proyecto_basic->idProyecto = $proyecto->id;
                $proyecto_basic->save();
                
                $request->file('logo')->move("../images/logos", $proyecto->id . ".png");
                $request->file('brochure')->move("../images/brochure", $proyecto->id . ".pdf");
                
               $proyecto = Proyectos::find($proyecto->id);
                
                return JsonResponse::create(array('message' => "Proyecto '" . $proyecto_basic->nombre . "' creado Correctamente", "request" => $proyecto), 200);
                }else{
                    return JsonResponse::create(array('message' => "No se encontro brochure del proyecto"), 402); 
                }
            }else{
                return JsonResponse::create(array('message' => "No se encontro logo del proyecto"), 402);
            }
    }
    
    public function finish_proccess(Request $request){
        $data = $request->all();
         $id = $data['idProyecto'];
         $paso = $data['paso'];
         $proyecto = Proyectos::find($id);
         $proyecto->$paso = 1;
         $proyecto->save();
         
         return JsonResponse::create(array('message' => "Paso '" . $data['paso'] . "' terminado correctamente", "request" => $proyecto), 200);
    }
    

}
