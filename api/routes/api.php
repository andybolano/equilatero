<?php

use Illuminate\Http\Request;


Route::get("paises/","ubicacionController@getPaises");
Route::get("departamentos/{pais}","ubicacionController@getDepartamentos");
Route::get("municipios/{departamento}","ubicacionController@getMunicipios");

include 'authenticate.php';
include 'proyectos.php';
include 'zonas_comunes.php';
include 'tipo_plano.php';
include 'tipo_proyecto.php';