import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";


@Index([
    'nombre',
    'apellido',
    'cedula',
    'fechaNacimiento'
])

@Index(['nombre', 'apellido', 'cedula'],
    {unique: true}
    )
@Entity('db_usuario') //nombre de la tabla usuario
export class UsuarioEntity {
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'identificador',
        name: 'id'
    })
    id: number;

    @Column({
        name: 'nombre',
        type: 'varchar',
        nullable: true

    })
    nombre?: string;

    @Column({
        name: 'apellido',
        type: 'varchar',
        nullable: true,
        length: '60'

    })
    apellido?: string

    @Column({
        name: 'cedula',
        type: 'varchar',
        nullable: false,
        unique: true,
        length: '18'

    })
    cedula?: string;

    @Column({
        name: 'sueldo',
        type: 'decimal',
        nullable: true,
        precision: 10,  //1000000.
        scale: 4, //.00001

    })
    sueldo?: number;

    @Column({
        name: 'fecha_nacimiento',
        type: 'date',
        nullable: true,
    })
    fechaNacimiento?: string;

    @Column({
        type: 'datetime',
        nullable: true,
        name: 'fecha_hora_nacimiento',
    })
    fechaHoraNacimiento?: string;

}