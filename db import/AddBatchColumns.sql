ALTER TABLE xarxadb.alumnos 
ADD COLUMN `batchpres1` tinyInt(1) DEFAULT NULL,
ADD COLUMN `batchpresobs1` text COLLATE utf8_spanish_ci,
ADD COLUMN `batchdev1` tinyInt(1) DEFAULT NULL,
ADD COLUMN `batchdevobs1` text COLLATE utf8_spanish_ci,
ADD COLUMN `batchpres2` tinyInt(1) DEFAULT NULL,
ADD COLUMN `batchpresobs2` text COLLATE utf8_spanish_ci,
ADD COLUMN `batchdev2` tinyInt(1) DEFAULT NULL,
ADD COLUMN `batchdevobs2` text COLLATE utf8_spanish_ci