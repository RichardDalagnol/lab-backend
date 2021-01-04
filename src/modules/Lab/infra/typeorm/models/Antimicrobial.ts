import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import SuscebilityTest from '@modules/Lab/infra/typeorm/models/SuscebilityTest'

@Entity('antimicrobianos')
class Antimicrobial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @OneToMany(() => SuscebilityTest, suscebilityTest => suscebilityTest.antimicrobial)
  testeSuscetibilidade!: SuscebilityTest[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Antimicrobial;