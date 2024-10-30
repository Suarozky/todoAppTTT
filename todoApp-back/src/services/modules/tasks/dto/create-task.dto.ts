import { IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';
import { status } from '../../../../databases/rds/entities/task.entity';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  userId?: string; // Suponiendo que la tarea está relacionada con un usuario

  @IsOptional()
  @IsEnum(status) // Validación para que sea uno de los valores del enum status
  status?: status; // Se puede establecer el estado al crear la tarea
}
