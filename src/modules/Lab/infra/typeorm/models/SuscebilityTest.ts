import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import Antimicrobial from '@modules/Lab/infra/typeorm/models/Antimicrobial'
import PathogenInSampleItem from '@modules/Lab/infra/typeorm/models/PathogenInSampleItem'

@Entity('testes_suscetibilidade')
class SuscebilityTest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pathogen_item_id: string;

  @Column()
  antimicrobial_id: string;

  @ManyToOne(() => Antimicrobial, antimicrobial => antimicrobial.testeSuscetibilidade)
  @JoinColumn({ name: 'antimicrobial_id' })
  antimicrobial: Antimicrobial;

  @ManyToOne(() => PathogenInSampleItem, pathogen => pathogen.testeSuscetibilidade)
  @JoinColumn({ name: 'pathogen_item_id' })
  patogeno: PathogenInSampleItem;

  @Column()
  halo: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default SuscebilityTest;