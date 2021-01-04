import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, UpdateDateColumn } from 'typeorm';
import Sample from '@modules/Lab/infra/typeorm/models/Sample';
@Entity('requisitantes')
class Requester {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  cidade: string;

  @Column()
  rua: string;

  @Column()
  bairro: string;

  @Column()
  telefone: string;

  @Column()
  numero: number;

  @OneToMany(() => Sample, sample => sample.requisitante)
  amostras!: Sample[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Requester;