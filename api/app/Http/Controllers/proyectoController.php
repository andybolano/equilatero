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
use File;

define('URL_SERVER', 'http://' . $_SERVER['HTTP_HOST'] . '/equilatero/api/');

class proyectoController extends Controller {

    //consulta todos los proyectos
    public function index() {
        try {
            $proyectos = DB::select(DB::raw("SELECT p.* FROM proyectos as p "));
            foreach ($proyectos as $key => $p) {
                $informacion_basica = $this->get_informaction_basic($p->id);

                ($p->banner == 1) ? $banner = $this->get_banner($p->id) : $banner = null;
                ($p->galeria == 1) ? $galeria = $this->get_galeria($p->id) : $galeria = null;
                ($p->planos == 1) ? $planos = $this->get_planos($p->id) : $planos = null;
                ($p->ubicacion_geografica == 1) ? $ubicacion = $this->get_ubicacion($p->id) : $ubicacion = null;
                ($p->zonas_comunes == 1) ? $zonas = $this->get_zonas($p->id) : $zonas = null;

                $array_projects[$key] = array(
                    'proyecto' => $p,
                    'informacion_basica' => $informacion_basica,
                    'banner' => $banner,
                    'galeria' => $galeria,
                    'planos' => $planos,
                    'ubicacion' => $ubicacion,
                    'zonas' => $zonas
                );
            }

            return $array_projects;
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No pudimos realizar la consulta de los proyectos", "exception" => $exc->getMessage(), "respuesta" => false), 401);
        }
    }

    //utilizado para actualizar los estados
    public function update(Request $request, $id) {
        try {
            $data = $request->all();
            $p = Proyectos::find($id);
            $p->informacion_basica = $data['informacion_basica'];
            $p->banner = $data['banner'];
            $p->galeria = $data['galeria'];
            $p->planos = $data['planos'];
            $p->ubicacion_geografica = $data['ubicacion_geografica'];
            $p->zonas_comunes = $data['zonas_comunes'];
            $p->estado = $data['estado'];
            $p->destacado = $data['destacado'];
            $p->save();

            return JsonResponse::create(array('message' => "Proyecto actualizado correctamente", "request" => json_encode($data)), 200);
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo Modificar la zona", "exception" => $exc->getMessage(), "request" => json_encode($data)), 401);
        }
    }

    //informacion básica*****************************
    public function save_informaction_basic(Request $request) {

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
            } else {
                return JsonResponse::create(array('message' => "No se encontro brochure del proyecto"), 402);
            }
        } else {
            return JsonResponse::create(array('message' => "No se encontro logo del proyecto"), 402);
        }
    }

    public function update_informaction_basic(Request $request) {
        try {
            $data = $request->all();
            $id = $data['id'];
            $proyecto_basic = Proyecto_basic::find($id);
            $proyecto_basic->nombre = $data['nombre'];
            $proyecto_basic->tipo = $data['tipo'];
            $proyecto_basic->direccion = $data['direccion'];
            $proyecto_basic->pais = $data['pais'];
            $proyecto_basic->departamento = $data['departamento'];
            $proyecto_basic->brochure = URL_SERVER . "images/brochure/" . $id . ".pdf";
            $proyecto_basic->municipio = $data['municipio'];
            $proyecto_basic->descripcion = $data['descripcion'];
            $proyecto_basic->save();
            if ($request->hasFile('brochure')) {
                $request->file('brochure')->move("../images/brochure", $id . ".pdf");
            }
            return JsonResponse::create(array('message' => "proyecto actualizado correctamente", "request" => json_encode($data)), 200);
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo Modificar la zona", "exception" => $exc->getMessage(), "request" => json_encode($data)), 401);
        }
    }

    private function get_informaction_basic($idProyecto) {
        $informacion_basica = DB::select(DB::raw("SELECT ib.*, tp.nombre as nombreTipoProyecto FROM proyecto_informacion_basica as ib INNER JOIN tipos_proyectos as tp ON tp.id = ib.tipo WHERE idProyecto = $idProyecto "));
        return $informacion_basica[0];
    }

    public function update_logo(Request $request) {
        $data = $request->all();
        $id = $data['idProyecto'];
        if ($request->hasFile('logo')) {
            $request->file('logo')->move("../images/logos", $id . ".png");
        }
        return JsonResponse::create(array('message' => "Logo actualizado", "request" => json_encode($data)), 200);
    }

    //informacion banner********************************
    public function save_banner(Request $request) {
        if ($request->hasFile('banner')) {
            $data = $request->all();
            $id = $data['idProyecto'];
            $proyecto = Proyectos::find($id);
            if($proyecto->banner == 1) {


                $request->file('banner')->move("../images/banner", $id . ".jpg");

                return JsonResponse::create(array('message' => "Banner actualizado", "request" => json_encode($data)), 200);
            }
            if($proyecto->banner == 0) {
                $proyecto->banner = 1;
                $proyecto->save();

                DB::table('proyecto_banner')->insert(
                        ['banner_url' => URL_SERVER . "images/banner/" . $id . ".jpg", 'idProyecto' => $id]
                );
                $request->file('banner')->move("../images/banner", $id . ".jpg");


                return JsonResponse::create(array('message' => "Banner guardado Correctamente", "request" => $proyecto), 200);
            }
        } else {
            return JsonResponse::create(array('message' => "No se encontro banner del proyecto"), 402);
        }
    }

    private function get_banner($idProyecto) {
        $banner = DB::select(DB::raw("SELECT * FROM proyecto_banner WHERE idProyecto = $idProyecto "));
        return $banner[0];
    }

    //informacion galeria********************************
    public function getter_galeria($idProyecto) {
        return $this->get_galeria($idProyecto);
    }

    private function get_galeria($idProyecto) {
        $galeria = DB::select(DB::raw("SELECT * FROM proyecto_galeria WHERE idProyecto = $idProyecto "));
        return $galeria;
    }

    public function save_galeria(Request $request) {
        if ($request->hasFile('galeria')) {
            $data = $request->all();
            $id = $data['idProyecto'];
          
            $tmpfname = time() . substr(md5(microtime()), 0, rand(5, 12));
            DB::table('proyecto_galeria')->insert(
                    ['galeria_url' => URL_SERVER . "images/galeria/" . $id . "_" . $tmpfname . ".jpg", 'idProyecto' => $id]
            );

            $request->file('galeria')->move("../images/galeria", $id . "_" . $tmpfname . ".jpg");

            $galeria = DB::select(DB::raw("SELECT * FROM proyecto_galeria WHERE idProyecto = $id"));


            return JsonResponse::create(array('message' => "Imagen guardada Correctamente", "galeria" => $galeria), 200);
            
           
        } else {
            return JsonResponse::create(array('message' => "No se encontro imagen"), 402);
        }
    }

    public function delete_galeria(Request $request) {
        $data = $request->all();
        $idProyecto = $data['idProyecto'];
        $idImagen = $data['idImagen'];
        $url = $data['url'];
        $res = explode("public", public_path(), 2);
        $name = explode("/", $url, 8);

        $file = $res[0] . "images\galeria" . chr(92) . $name[7];

        if (File::isFile($file)) {
            File::delete($file);
        }


        $imagen = DB::select(DB::raw("DELETE FROM proyecto_galeria WHERE id = $idImagen"));
        $galeria = $this->get_galeria($idProyecto);
        return JsonResponse::create(array('message' => "Imagen eliminada", "galeria" => $galeria), 200);
    }

    //informacion planos********************************
    public function getter_planos($idProyecto) {
        return $this->get_planos($idProyecto);
    }

    private function get_planos($idProyecto) {
        $planos = DB::select(DB::raw("SELECT pp.*, tp.nombre as nombreTipoPlano FROM proyecto_plano pp INNER JOIN tipos_planos as tp ON tp.id = pp.tipo WHERE pp.idProyecto = $idProyecto "));
        return $planos;
    }

    public function save_plano(Request $request) {
        if ($request->hasFile('imagen')) {
            $data = $request->all();

            $id = $data['idProyecto'];
            $tmpfname = time() . substr(md5(microtime()), 0, rand(5, 12));
            $proyecto_plano = new Proyecto_plano();
            $proyecto_plano->url_plano = URL_SERVER . "images/planos/" . $id . "_" . $tmpfname . ".png";
            $proyecto_plano->titulo = $data['titulo'];
            $proyecto_plano->tipo = $data['tipo'];
            $proyecto_plano->valor_desde = $data['valor_desde'];
            $proyecto_plano->area_balcon = $data['area_balcon'];
            $proyecto_plano->area_construida = $data['area_construida'];
            $proyecto_plano->area_privada = $data['area_privada'];
            $proyecto_plano->estrato = $data['estrato'];
            $proyecto_plano->idProyecto = $data['idProyecto'];
            $proyecto_plano->save();

            $request->file('imagen')->move("../images/planos", $id . "_" . $tmpfname . ".png");

            $plano = DB::select(DB::raw("SELECT proyecto_plano.*, tipos_planos.nombre as tipo_nombre FROM proyecto_plano INNER JOIN tipos_planos ON tipos_planos.id = proyecto_plano.tipo WHERE idProyecto = $id"));

            return JsonResponse::create(array('message' => "Plano guardado Correctamente", "planos" => $plano), 200);
        }
    }

    public function update_plano(Request $request) {

        $data = $request->all();

        $id = $data['id'];

        $tmpfname = time() . substr(md5(microtime()), 0, rand(5, 12));
        $proyecto_plano = Proyecto_plano::find($id);
        $proyecto_plano->titulo = $data['titulo'];
        $proyecto_plano->tipo = $data['tipo'];
        $proyecto_plano->valor_desde = $data['valor_desde'];
        $proyecto_plano->area_balcon = $data['area_balcon'];
        $proyecto_plano->area_construida = $data['area_construida'];
        $proyecto_plano->area_privada = $data['area_privada'];
        $proyecto_plano->estrato = $data['estrato'];
        $proyecto_plano->idProyecto = $data['idProyecto'];


        if ($request->hasFile('imagen')) {
            $request->file('imagen')->move("../images/planos", $id . "_" . $tmpfname . ".png");
            $proyecto_plano->url_plano = URL_SERVER . "images/planos/" . $id . "_" . $tmpfname . ".png";
        }

        $proyecto_plano->save();
        $idProyecto = $data['idProyecto'];
        $plano = $this->get_planos($idProyecto);

        return JsonResponse::create(array('message' => "Plano actualizado Correctamente", "planos" => $plano), 200);
    }

    //informacion zonas********************************
    public function save_zonas(Request $request) {
        $data = $request->all();
        $id = $data['idProyecto'];
        $zonas = $data['zonas'];
        $proyecto = Proyectos::find($id);
        $proyecto->zonas_comunes = 1;
        $proyecto->save();
         DB::select(DB::raw("DELETE FROM proyecto_zona WHERE idProyecto = $id"));
        foreach ($zonas as $key => $r) {
            $array[$key] = array('idZona' => $r, 'idProyecto' => $id);
        }
        $respuesta = DB::table('proyecto_zona')->insert($array);
        return JsonResponse::create(array('message' => "Zonas guardadas correctamente", "request" => $proyecto), 200);
    }

    private function get_zonas($idProyecto) {
        $zonas = DB::select(DB::raw("SELECT zc.nombre,zc.url, pz.id as idProyectoZona, pz.idZona  FROM proyecto_zona as pz INNER JOIN zonas_comunes as zc ON zc.id = pz.idZona  WHERE pz.idProyecto = $idProyecto "));
        return $zonas;
    }

    //informacion pocision*******************************
    public function save_position(Request $request) {
        $data = $request->all();
        $id = $data['idProyecto'];
        $proyecto = Proyectos::find($id);

        if ($proyecto->ubicacion_geografica == 0) {
            $proyecto->ubicacion_geografica = 1;
            $proyecto->save();
            DB::table('proyecto_ubicacion')->insert(
                    ['lat' => $data['lat'], 'lng' => $data['lng'], 'idProyecto' => $id]
            );
            return JsonResponse::create(array('message' => "Ubicación guardada correctamente", "request" => $proyecto), 200);
        }

        if ($proyecto->ubicacion_geografica == 1) {
            $lat = $data['lat'];
            $lng = $data['lng'];
            DB::select(DB::raw("UPDATE proyecto_ubicacion SET lat = $lat, lng = $lng  WHERE idProyecto = $id "));

            return JsonResponse::create(array('message' => "Ubicación actualizada correctamente", "request" => $proyecto), 200);
        }
    }

    private function get_ubicacion($idProyecto) {
        $ubicacion = DB::select(DB::raw("SELECT * FROM proyecto_ubicacion WHERE idProyecto = $idProyecto "));
        return $ubicacion;
    }

    public function finish_proccess(Request $request) {
        $data = $request->all();
        $id = $data['idProyecto'];
        $paso = $data['paso'];
        $proyecto = Proyectos::find($id);
        $proyecto->$paso = 1;
        $proyecto->save();

        return JsonResponse::create(array('message' => "Paso '" . $data['paso'] . "' terminado correctamente", "request" => $proyecto), 200);
    }

}
