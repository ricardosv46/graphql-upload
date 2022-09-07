import { DateScalar } from '@src/utils/constanst'
import { Field, InputType, ObjectType } from 'type-graphql'
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm'
import Conexion from './Conexion'

@Entity()
@ObjectType()
export default class Usuario {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column({ unique: true })
  email!: string

  @Field()
  @Column()
  name!: string

  @Field()
  @Column()
  lastname!: string

  @Column()
  password!: string

  @Column({ nullable: true })
  externalid: string

  @Field(() => DateScalar)
  @CreateDateColumn()
  createdAt: Date = new Date()

  @Field(() => DateScalar)
  @UpdateDateColumn()
  updatedAt: Date = new Date()

  @Field({ nullable: true })
  token?: string

  @Field(() => [Conexion])
  @OneToMany(() => Conexion, (conn) => conn.user)
  conexiones: Conexion[]
}

@InputType()
export class UsuarioInput {
  @Field()
  email!: string

  @Field()
  password!: string
}
