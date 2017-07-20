<?php
namespace App\Http\Controllers;
use DB;


class ubicacionController extends Controller {

    public function getPaises() {
        $paises = DB::select(DB::raw("SELECT * FROM pais"));
        return $paises;
    }

    public function getDepartamentos($pais) {
        $departamentos = DB::select(DB::raw("SELECT * FROM departamento WHERE idPais = $pais"));
        return $departamentos;
    }

    public function getMunicipios($departamento) {
        $municipios = DB::select(DB::raw("SELECT * FROM municipio WHERE departamento_iddepartamento = $departamento"));
        return $municipios;
    }
    
}

