import { Router } from 'express';
import { createCollectionHandler, getCollectionsHandler } from '../controllers/collectionController';

const router = Router();

router.post('/', createCollectionHandler);
router.get('/', getCollectionsHandler);

export default router;
