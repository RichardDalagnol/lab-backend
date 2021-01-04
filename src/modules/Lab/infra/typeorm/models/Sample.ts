import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany, UpdateDateColumn } from 'typeorm';
import SampleItens from '@modules/Lab/infra/typeorm/models/SampleItem'
import Requester from '@modules/Lab/infra/typeorm/models/Requester'
@Entity('amostras')
class Sample {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  descricao: string;

  @Column()
  especie: string;

  @Column()
  raca: string;

  @Column()
  sexo: 'masculino' | 'feminino';

  @Column()
  idade: string;

  @Column()
  proprietario: string;

  @Column()
  numero: number;

  @Column()
  ano: number;

  @Column()
  observacao: string;

  @Column()
  flagTratamento: boolean;

  @Column()
  flagAcondicionada: boolean;

  @Column()
  valor: number;

  @Column()
  flagPago: boolean;

  @Column()
  dataRecebimento: Date;

  @OneToMany(() => SampleItens, ordersProducts => ordersProducts.amostra)
  amostraItens!: SampleItens[];

  @Column()
  requisitante_id: string;

  @ManyToOne(() => Requester, requester => requester.amostras)
  @JoinColumn({ name: 'requisitante_id' })
  requisitante: Requester;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Sample;