import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import SampleItem from '@modules/Lab/infra/typeorm/models/SampleItem'
import Pathogen from '@modules/Lab/infra/typeorm/models/Pathogen'
import SuscebilityTest from '@modules/Lab/infra/typeorm/models/SuscebilityTest'

@Entity('patogenos_itens')
class PathogenInSampleItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amostra_item_id: string;

  @Column()
  patogeno_id: string;

  @ManyToOne(() => SampleItem, SampleItem => SampleItem.patogenos)
  @JoinColumn({ name: 'amostra_item_id' })
  amostra_item: SampleItem;

  @ManyToOne(() => Pathogen, pathogen => pathogen.amostras_itens)
  @JoinColumn({ name: 'patogeno_id' })
  patogeno: Pathogen;

  @OneToMany(() => SuscebilityTest, suscebilityTest => suscebilityTest.patogeno)
  testeSuscetibilidade!: SuscebilityTest[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default PathogenInSampleItem;