import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import Sample from '@modules/Lab/infra/typeorm/models/Sample'
import PathogenInSampleItem from '@modules/Lab/infra/typeorm/models/PathogenInSampleItem'

@Entity('amostras_itens')
class SampleItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  descricao: string;

  @Column()
  amostra_id: string;

  @ManyToOne(() => Sample, sample => sample.amostraItens)
  @JoinColumn({ name: 'amostra_id' })
  amostra: Sample;

  @OneToMany(() => PathogenInSampleItem, pathogenItens => pathogenItens.amostra_item)
  patogenos!: PathogenInSampleItem[];


  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default SampleItem;