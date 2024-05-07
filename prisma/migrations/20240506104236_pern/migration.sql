-- CreateTable
CREATE TABLE "Post" (
    "todo_id" SERIAL NOT NULL,
    "description" VARCHAR(255) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("todo_id")
);
