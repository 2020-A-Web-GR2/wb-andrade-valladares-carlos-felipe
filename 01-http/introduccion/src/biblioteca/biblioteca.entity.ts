import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

Index([
    'nombre',
    'direccion',
    'numero_clientes',
    'categoria_libros',
    'estado'
])

@Entity('epn_biblioteca') //nombre de la tabla usuario
export class BibliotecaEntity {
    @PrimaryGeneratedColumn( {
        unsigned: true,
        comment: 'identificador',
        name: 'id'
    } )
    id: number;

    @Column( {
        name: 'nombre',
        type: 'varchar',
        nullable: false

    } )
    nombre?: string;

    @Column( {
        name: 'direccion',
        type: 'varchar',
        nullable: true,
        length: '60'

    } )
    direccion?: string

    @Column( {
        name: 'numero_clientes',
        type: 'varchar',
        nullable: true,

    } )
    numero_clientes?: string;

    @Column( {
        name: 'categoria_libros',
        type: 'varchar',
        nullable: true,
        length: '60'

    } )
    categoria_libros?: string;

    @Column( {
        name: 'estado',
        type: 'varchar',
        nullable: true,
        length: '60'

    } )
    estado?: string;




}