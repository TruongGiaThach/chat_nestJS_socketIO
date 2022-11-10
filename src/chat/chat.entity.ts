import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity()
class Chat {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    email: string;

    @Column({ unique: true })
    text: string;

    @CreateDateColumn()
    createdat: Date;
}
 
export default Chat;
