BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[users] (
    [id] INT NOT NULL IDENTITY(1,1),
    [username] VARCHAR(50) NOT NULL,
    [password] VARCHAR(255) NOT NULL,
    [email] VARCHAR(100),
    [firstName] VARCHAR(50),
    [lastName] VARCHAR(50),
    [isActive] BIT NOT NULL CONSTRAINT [users_isActive_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [users_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [users_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [users_username_key] UNIQUE NONCLUSTERED ([username]),
    CONSTRAINT [users_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[categories] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(100) NOT NULL,
    [description] TEXT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [categories_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [categories_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [categories_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[webinars] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] VARCHAR(200) NOT NULL,
    [description] TEXT NOT NULL,
    [thumbnailUrl] VARCHAR(500),
    [isActive] BIT NOT NULL CONSTRAINT [webinars_isActive_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [webinars_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [categoryId] INT NOT NULL,
    CONSTRAINT [webinars_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[videos] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] VARCHAR(200) NOT NULL,
    [description] TEXT,
    [videoUrl] VARCHAR(500) NOT NULL,
    [thumbnailUrl] VARCHAR(500),
    [duration] INT,
    [order] INT NOT NULL CONSTRAINT [videos_order_df] DEFAULT 1,
    [isActive] BIT NOT NULL CONSTRAINT [videos_isActive_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [videos_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [webinarId] INT NOT NULL,
    CONSTRAINT [videos_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[webinars] ADD CONSTRAINT [webinars_categoryId_fkey] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[categories]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[videos] ADD CONSTRAINT [videos_webinarId_fkey] FOREIGN KEY ([webinarId]) REFERENCES [dbo].[webinars]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
