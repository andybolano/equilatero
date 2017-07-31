<?php

use Illuminate\Http\Request;


Route::get("paises/","ubicacionController@getPaises");
Route::get("departamentos/{pais}","ubicacionController@getDepartamentos");
Route::get("municipios/{departamento}","ubicacionController@getMunicipios");
Route::post("contacto","userController@postContacto");
Route::post("postventa","userController@postPostventa");
Route::post("cotizacion","userController@postCotizacion");
include 'authenticate.php';
include 'proyectos.php';
include 'zonas_comunes.php';
include 'tipo_plano.php';
include 'tipo_proyecto.php';
include 'compromiso_social.php';
include 'user.php';