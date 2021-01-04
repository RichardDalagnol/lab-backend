import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import PathogenInSampleItem from '@modules/Lab/infra/typeorm/models/PathogenInSampleItem'

@Entity('patogenos')
class Pathogen {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @OneToMany(() => PathogenInSampleItem, pathogenItens => pathogenItens.patogeno)
  amostras_itens!: PathogenInSampleItem[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Pathogen;