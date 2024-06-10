<?php

namespace App\Traits;

trait Enumerable {
    public static function case($case, $default = null)
    {
        $enum_cases = self::cases();

        foreach($enum_cases as $enum_case){
            if($enum_case->name == $case){
                return $enum_case->value;
            }
        }

        return $default;
    }

    public static function toArray($associative = false){
        $enum_cases = self::cases();

        $array = [];

        foreach($enum_cases as $enum_case){
            if($associative){
                $array[$enum_case->name] = $enum_case->value;
            }else{
                $array[] = ['case' => $enum_case->name, 'value' => $enum_case->value];
            }
        }

        return $array;
    }
}