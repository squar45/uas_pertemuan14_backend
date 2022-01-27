import { PrismaClient } from "@prisma/client";

const patient_model = new PrismaClient().patients

export default patient_model

